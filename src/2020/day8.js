const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("8");
  const mockData = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
  `;
  const cleanData = data
    .trim()
    .split("\n")
    .filter((item) => item);
  return {
    day8a: runA(cleanData),
    day8b: runB(cleanData)
  };
};

const process = (data) =>
  data.map((line) => {
    const [opperation, value] = line.split(" ");
    return { type: opperation, value: parseFloat(value), visited: false };
  });
const runA = (data) => {
  const instructions = process(data);
  let index = 0;
  let result = [];

  while (true) {
    if (instructions[index].visited) {
      break;
    }
    instructions[index].visited = true;
    const value = instructions[index].value;
    if (instructions[index].type === "acc") {
      index += 1;
      result.push(value);
    }
    if (instructions[index].type === "jmp") {
      index += instructions[index].value;
    }
    if (instructions[index].type === "nop") {
      index += 1;
    }
  }
  return result.reduce((a, b) => a + b);
};
const runB = (data) => {};
main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
