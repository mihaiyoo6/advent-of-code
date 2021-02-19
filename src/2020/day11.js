const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("11");
  const mockData = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;
  const cleanData = data.split("\n").filter((item) => item);

  return {
    day11a: runA(cleanData),
    day11b: runB(cleanData)
  };
};

const neighbors = (arr, m, n) => {
  // define what a neighbor is
  const v = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
    [1, 1], // down-right
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1] // down-left
  ];
  // filter edges & map
  return v
    .filter(
      ([h, j]) =>
        h + m >= 0 && h + m < arr.length && j + n >= 0 && j + n < arr[0].length
    )
    .map(([h, j]) => arr[h + m][j + n]);
};

// If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
// If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.
const applyRules = (arr) => {
  const newState = arr.map((line, y) => {
    return [...line]
      .map((seat, x) => {
        const ocupiedAdiacentSeats = neighbors(arr, y, x).filter(
          (i) => i === "#"
        ).length;
        if (seat === "#" && ocupiedAdiacentSeats >= 4) {
          //seat empties
          return "L";
        }
        if (seat === "L" && ocupiedAdiacentSeats === 0) {
          //seat occupies
          return "#";
        }
        return seat;
      })
      .reduce((a, b) => a + b, "");
  });
  if (arr.join() !== newState.join()) {
    return applyRules(newState);
  }
  return newState;
};
const runA = (data) => {
  const finalState = applyRules(data);
  return finalState.reduce((a, b) => a + (b.match(/#/g) || []).length, 0);
};
const runB = (data) => {};
main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
