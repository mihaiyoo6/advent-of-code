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

  return getSum(instructions);
};

const getSum = (instructions, index = 0, sum = 0) => {
  if (instructions[index].visited) {
    return sum;
  }
  instructions[index].visited = true;
  const { value, type } = instructions[index];
  if (type === "acc") {
    index += 1;
    sum += value;
  }
  if (type === "jmp") {
    index += value;
  }
  if (type === "nop") {
    index += 1;
  }
  return getSum(instructions, index, sum);
};

const runProgram = (
  instructions,
  acumulator = 0,
  index = 0,
  visited = new Set()
) => {
  const { type, value } = instructions[index] || [];
  const nextVisited = new Set([...visited, index]);

  return visited.has(index)
    ? -1
    : index === instructions.length
    ? acumulator
    : type === "acc"
    ? runProgram(instructions, acumulator + value, index + 1, nextVisited)
    : type === "jmp"
    ? runProgram(instructions, acumulator, index + value, nextVisited)
    : runProgram(instructions, acumulator, index + 1, nextVisited);
};

// const runProgram = (instructions, acumulator = 0, index = 0) => {
//   const { type, value, visited } = instructions[index] || [];

//   if (visited) {
//     return -1;
//   } else if (index === instructions.length) {
//     return acumulator;
//   } else if (type === "acc") {
//     instructions[index].visited = true;
//     runProgram(instructions, acumulator + value, index + 1);
//   } else if (type === "jmp") {
//     instructions[index].visited = true;
//     runProgram(instructions, acumulator, index + value);
//   } else {
//     instructions[index].visited = true;
//     runProgram(instructions, acumulator, index + 1);
//   }

//   // return visited.has(index)
//   //   ? -1
//   //   : index === instructions.length
//   //   ? acumulator
//   //   : type === "acc"
//   //   ? runProgram(instructions, acumulator + value, index + 1)
//   //   : type === "jmp"
//   //   ? runProgram(instructions, acumulator, index + value)
//   //   : runProgram(instructions, acumulator, index + 1);
// };

const runB = (data) => {
  const instructions = process(data);

  const canditates = [];
  for (let i = 0; i < instructions.length; i++) {
    const { type, value } = instructions[i];
    if (type === "nop") {
      const newInstructions = [...instructions];
      newInstructions[i] = { type: "jmp", value };
      canditates.push(runProgram(newInstructions));
    } else if (type === "jmp") {
      const newInstructions = [...instructions];
      newInstructions[i] = { type: "nop", value };
      canditates.push(runProgram(newInstructions));
    }
  }
  return Math.max(...canditates);
};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
