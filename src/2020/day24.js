const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("24");

  return {
    day24a: runA(data.split("\n").filter((item) => item)),
    day24b: runB(data.split("\n").filter((item) => item))
  };
};
const runA = (data) => {};
const runB = (data) => {};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
