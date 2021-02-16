const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("22");

  return {
    day22a: runA(data.split("\n").filter((item) => item)),
    day22b: runB(data.split("\n").filter((item) => item))
  };
};
const runA = (data) => {};
const runB = (data) => {};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
