const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("10");
  const mockData = `
16
10
15
5
1
11
7
19
6
12
4`;
  const cleanData = mockData
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
const runB = (data) => {};
main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
