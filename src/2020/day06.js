const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData(6);
  return {
    day6a: runA(data.split("\n")),
    day6b: runB(data.split("\n"))
  };
};

const runA = (data) => {
  let result = 0;
  let group = "";
  for (const line of data) {
    if (line.length === 0) {
      result += group.length;
      group = "";
    }
    group = [...new Set([...group, ...line])];
  }
  return result;
};

const runB = (data) => {
  let result = 0;
  let group = [];
  for (const line of data) {
    if (line.length === 0) {
      const intersection = group.reduce((a, b) => {
        return b.filter(Set.prototype.has, new Set(a));
      });
      result += intersection.length;
      group = [];
    } else {
      group.push([...line]);
    }
  }
  return result;
};

// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
