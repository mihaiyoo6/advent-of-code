const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData(1);
  const cleanData = data
    .split("\n")
    .filter((i) => i)
    .map((item) => parseInt(item, 10))
    .filter((item) => item);
  return {
    day1a: runA(cleanData),
    day1b: runB(cleanData)
  };
};

const runA = (arr) => {
  let result = "NOT_FOUND";
  for (const item of arr) {
    const diff = 2020 - item;

    if (arr.includes(diff)) {
      result = item * diff;
    }
  }
  return result;
};

const runB = (arr) => {
  let result = "NOT_FOUND";
  for (const first of arr) {
    for (const second of arr) {
      for (const third of arr) {
        if (2020 === first + second + third) result = first * second * third;
      }
    }
  }
  return result;
};

module.exports = main;
