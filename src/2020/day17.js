const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("17");

  return {
    day17a: runA(data.split("\n").filter((item) => item)),
    day17b: runB(data.split("\n").filter((item) => item))
  };
};
const runA = (data) => {};
const runB = (data) => {};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
