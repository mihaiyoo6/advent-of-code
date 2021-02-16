const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("23");

  return {
    day23a: runA(data.split("\n").filter((item) => item)),
    day23b: runB(data.split("\n").filter((item) => item))
  };
};
const runA = (data) => {};
const runB = (data) => {};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
