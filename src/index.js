var http = require("http");
const day01 = require("./2020/day01");
const day02 = require("./2020/day02");
const day03 = require("./2020/day03");
const day04 = require("./2020/day04");
const day05 = require("./2020/day05");
const day06 = require("./2020/day06");
const day07 = require("./2020/day07");
const day08 = require("./2020/day08");
const day09 = require("./2020/day09");
const day10 = require("./2020/day10");
const day11 = require("./2020/day11");
const day12 = require("./2020/day12");
const day13 = require("./2020/day13");
const day14 = require("./2020/day14");
const day15 = require("./2020/day15");
const day16 = require("./2020/day16");
const day17 = require("./2020/day17");
const day18 = require("./2020/day18");
const day19 = require("./2020/day19");
const day20 = require("./2020/day20");
const day21 = require("./2020/day21");
const day22 = require("./2020/day22");
const day23 = require("./2020/day23");
const day24 = require("./2020/day24");
const day25 = require("./2020/day25");

//create a server object:
http
  .createServer(async function (req, res) {
    const result = [
      { title: "2020-day01", result: await day01() },
      { title: "2020-day02", result: await day02() },
      { title: "2020-day03", result: await day03() },
      { title: "2020-day04", result: await day04() },
      { title: "2020-day05", result: await day05() },
      { title: "2020-day06", result: await day06() },
      { title: "2020-day07", result: await day07() },
      { title: "2020-day08", result: await day08() },
      { title: "2020-day09", result: await day09() },
      { title: "2020-day10", result: await day10() },
      { title: "2020-day11", result: await day11() },
      { title: "2020-day12", result: await day12() },
      { title: "2020-day13", result: await day13() },
      { title: "2020-day14", result: await day14() },
      { title: "2020-day15", result: await day15() },
      { title: "2020-day16", result: await day16() },
      { title: "2020-day17", result: await day17() },
      { title: "2020-day18", result: await day18() },
      { title: "2020-day19", result: await day19() },
      { title: "2020-day20", result: await day20() },
      { title: "2020-day21", result: await day21() },
      { title: "2020-day22", result: await day22() },
      { title: "2020-day23", result: await day23() },
      { title: "2020-day24", result: await day24() },
      { title: "2020-day25", result: await day25() }
    ].map(
      ({ title, result }, i) =>
        `<div class="item ${i % 2 === 0 && "odd"}">
          <h2><a target="_blank" href=${`https://adventofcode.com/${
            title.split("-")[0]
          }/day/${i + 1}`}>${title}</a></h2>
          <pre>${JSON.stringify(result, null, 2)}</pre>
        </div>`
    );

    res.write(
      `<h1>Advent of Code</h1>
      <style>
      h1,h2 {
        text-transform: uppercase;
      }
      a {
        color: black;
        cursore: pointer;
        text-decoration: none; /* no underline */
      }
      .container {
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        padding: 10px;
        border: 1px solid gray;
        background: white;
        margin: 4px;
        flex: 1;
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.65);
        transition: all .2s ease-in-out;
      }
      .item.odd {
        background: aliceblue;
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.65);
      }
      .item:hover { 
        transform: scale(1.1);
        box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.75); }
      </style>
      <div class="container">
      ${result.reduce((a, b) => a + b, "")}
      </div>`
    ); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
console.log("server started");
