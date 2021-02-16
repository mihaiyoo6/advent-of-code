const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData(3);
  return {
    day3a: run(data.split("\n").filter((i) => i)),
    day3b: run2(data.split("\n").filter((i) => i))
  };
};

const run = (data) => {
  let trees = 0;
  let offset = 0;
  data.forEach((line) => {
    const lineIndex = offset % line.length;
    if (line[lineIndex] === "#") trees++;
    offset += 3;
  });
  return trees;
};

const run2 = (data) => {
  const configSlope = (right, down = 1) => ({
    right,
    down,
    offset: 0,
    trees: 0
  });
  const slopes = [
    configSlope(1),
    configSlope(3),
    configSlope(5),
    configSlope(7),
    configSlope(1, 2)
  ];
  data.forEach((line, index) => {
    slopes.forEach((slope) => {
      if (index % slope.down !== 0) return;
      const lineIndex = slope.offset % line.length;
      if (line[lineIndex] === "#") slope.trees += 1;
      slope.offset += slope.right;
    });
  });
  return slopes.reduce((p, c) => p * c.trees, 1);
};

module.exports = main;
