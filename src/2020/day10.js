const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("10");
  const mockData = `
  28
  33
  18
  42
  31
  14
  46
  20
  48
  47
  24
  23
  49
  45
  19
  38
  39
  11
  1
  32
  25
  35
  8
  17
  7
  9
  4
  2
  34
  10
  3`;
  const cleanData = data
    .trim()
    .split(`\n`)
    .filter((i) => i)
    .map(Number);
  return {
    day10a: runA(cleanData),
    day10b: runB(cleanData)
  };
};
const runA = (data) => {
  const adapters = data.sort((a, b) => a - b);
  const deciceAdapter = Math.max(...adapters) + 3;
  const { ones, trees } = [...adapters, deciceAdapter].reduce(
    (acc, curr) => {
      const diff = curr - acc.prev;
      if (diff === 1) {
        acc.ones++;
      } else if (diff === 3) {
        acc.trees++;
      }
      acc.prev = curr;
      return acc;
    },
    {
      ones: 0,
      trees: 0,
      prev: 0
    }
  );
  console.log({ ones, trees });
  return ones * trees;
};

const canBeSkipped = (arr, i) => arr[i + 1] - arr[i - 1] <= 3;
const findPosibilities = (arr, memo = {}) => {
  const key = arr.join`,`;
  if (key in memo) {
    return memo[key];
  }
  let result = 1;
  for (let i = 1; i < arr.length - 1; i++) {
    if (canBeSkipped(arr, i)) {
      result += findPosibilities([arr[i - 1]].concat(arr.slice(i + 1)), memo);
    }
  }
  memo[key] = result;
  return result;
};

const runB = (data) => {
  const adapters = data.sort((a, b) => a - b);
  const deciceAdapter = Math.max(...adapters) + 3;
  const allAdapters = [0, ...adapters, deciceAdapter];

  return findPosibilities(allAdapters);
};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
