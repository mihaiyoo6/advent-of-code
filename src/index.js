var http = require("http");
const day1 = require("./2020/day1");
const day2 = require("./2020/day2");
const day3 = require("./2020/day3");
const day4 = require("./2020/day4");
const day5 = require("./2020/day5");
const day6 = require("./2020/day6");

//create a server object:
http
  .createServer(async function (req, res) {
    const day1r = await day1();
    const day2r = await day2();
    const day3r = await day3();
    const day4r = await day4();
    const day5r = await day5();
    const day6r = await day6();
    const result = [
      { title: "2020-day1", result: day1r },
      { title: "2020-day2", result: day2r },
      { title: "2020-day3", result: day3r },
      { title: "2020-day4", result: day4r },
      { title: "2020-day5", result: day5r },
      { title: "2020-day6", result: day6r }
    ];
    res.write(
      `<h1>Advent of Code</h1>
      ${result.map(
        ({ title, result }) =>
          `<div>
            <h2>${title}</h2>
            <pre>${JSON.stringify(result, null, 2)}</pre>
          </div>`
      )}`
    ); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080