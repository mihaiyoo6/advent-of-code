const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData(5);
  return {
    day5a: runA(data.split("\n").filter((i) => i)),
    day5b: runB(data.split("\n").filter((i) => i))
  };
};

const processData = (data) =>
  data.map((item) => {
    const row = getRowRange([0, 127], item);
    const column = getColumnRange([0, 7], item);
    return row * 8 + column;
  });

const runA = (data) => {
  const result = processData(data).reduce((prev, current) =>
    prev > current ? prev : current
  );
  return result;
};

const runB = (data) => {
  const sorted = processData(data).sort((a, b) => a - b);
  let result = sorted[0];
  for (const [i, v] of sorted.entries()) {
    if (sorted[i + 1] !== v + 1) {
      result = v + 1;
      break;
    }
  }
  return result;
};

const getRowRange = (rowRange, position) => {
  const [min, max] = rowRange;
  if (position[0] === "F") {
    return getRowRange(
      [min, Math.floor(max - (max - min) / 2)],
      position.substring(1)
    );
  }
  if (position[0] === "B") {
    return getRowRange(
      [Math.ceil(min + (max - min) / 2), max],
      position.substring(1)
    );
  }
  if (position.length >= 1) {
    return getRowRange([min, max], position.substring(1));
  }
  return rowRange[0];
};

const getColumnRange = (columnRange, position) => {
  const [min, max] = columnRange;
  if (position[0] === "L") {
    return getColumnRange(
      [min, Math.floor(max - (max - min) / 2)],
      position.substring(1)
    );
  }
  if (position[0] === "R") {
    return getColumnRange(
      [Math.ceil(min + (max - min) / 2), max],
      position.substring(1)
    );
  }
  if (position.length >= 1) {
    return getColumnRange([min, max], position.substring(1));
  }
  return columnRange[0];
};

// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
