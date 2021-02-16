const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("9");
  const mockData = `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;
  const cleanData = data.trim().split(`\n`).map(Number);
  return {
    day9a: runA(cleanData),
    day9b: runB(cleanData)
  };
};
const runA = (data) => findBastard(data, 0, 25).bastard;

const findBastard = (data, start = 0, preambul = 5) => {
  const toSum = data.slice(start, start + preambul);
  const toEqual = data[start + preambul];
  const result = toSum.map((i) => toSum.includes(toEqual - i)).filter(Boolean);
  return !!result.length
    ? findBastard(data, start + 1, preambul)
    : { bastard: toEqual, index: start + preambul };
};

const sumToMatch = (arr, toMatch) => {
  let sum = 0;
  const items = [];
  let found = false;
  for (let a = 0; a < arr.length; a++) {
    for (let b = a; b < arr.length; b++) {
      const itemToAdd = arr[b];
      sum += arr[b];
      items.push(itemToAdd);
      if (sum === toMatch) {
        found = true;
        break;
      }
      if (sum > toMatch) {
        break;
      }
    }
    if (found) {
      return { max: Math.max(...items), min: Math.min(...items) };
    } else {
      items.length = 0;
      sum = 0;
    }
  }
};

const runB = (data) => {
  const { bastard, index: bastardIndex } = findBastard(data, 0, 25);
  const toSum = data.slice(0, bastardIndex);
  const { min, max } = sumToMatch(toSum, bastard);
  return min + max;
};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
