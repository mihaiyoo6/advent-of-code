const fetch = require("node-fetch");

module.exports = {
  fetchData: async (day) => {
    const url = `https://adventofcode.com/2020/day/${day}/input`;
    const res = await fetch(url, {
      headers: {
        cookie:
          "session=53616c7465645f5f81f5fd2095464ac9e0aa9b81bc6921d71128f76ed9b9ff6b5bb26acb4b87ec7ca5114ae87023e03f"
      }
    });
    const data = await res.text();
    return data;
  }
};

// Draft day

// const { fetchData } = require("../utils");
// const main = async () => {
//   const data = await fetchData("?");

//   return {
//     "day?a": runA(data.split("\n").filter((item) => item)),
//     "day?b": runB(data.split("\n").filter((item) => item))
//   };
// };
// const runA = (data) => {};
// const runB = (data) => {};
// main().then((r) => console.log(JSON.stringify(r, null, 2)));
// module.exports = main;
