const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData(2);
  return {
    day2a: runA(data.split("\n").filter((i) => i)),
    day2b: runB(data.split("\n").filter((i) => i))
  };
};

const runA = (arr) => {
  const result = arr
    .map((item) => {
      const [rules, password] = item.split(": ");
      const [numbers, letter] = rules.split(" ");
      const [min, max] = numbers.split("-");
      const occupancies = password.split(letter).length - 1;
      const isCorrect = min <= occupancies && occupancies <= max;
      return {
        min: parseInt(min, 10),
        max: parseInt(max, 10),
        letter,
        password,
        occupancies,
        isCorrect
      };
    })
    .filter((item) => item.isCorrect);
  return result.length;
};

const runB = (arr) => {
  const result = arr
    .map((item) => {
      const [rules, password] = item.split(": ");
      const [numbers, letter] = rules.split(" ");
      const [min, max] = numbers.split("-");
      const occupancies = password.split(letter).length - 1;
      const isFirst = password[min - 1] === letter;
      const isLast = password[max - 1] === letter;
      const isCorrect = (isFirst && !isLast) || (!isFirst && isLast);

      return {
        min: parseInt(min, 10),
        max: parseInt(max, 10),
        letter,
        password,
        occupancies,
        isCorrect,
        isFirst,
        isLast
      };
    })
    .filter((item) => item.isCorrect);
  //   console.log(JSON.stringify(result, null, 2))
  return result.length;
};

module.exports = main;
