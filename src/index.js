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

//create a server object:
http
  .createServer(async function (req, res) {
    const result = [
      { title: "2020-day1", result: await day01() },
      { title: "2020-day2", result: await day02() },
      { title: "2020-day3", result: await day03() },
      { title: "2020-day4", result: await day04() },
      { title: "2020-day05", result: await day05() },
      { title: "2020-day06", result: await day06() },
      { title: "2020-day07", result: await day07() },
      { title: "2020-day08", result: await day08() },
      { title: "2020-day09", result: await day09() },
      { title: "2020-day10", result: await day10() }
    ].map(
      ({ title, result }, i) =>
        `<div class="item ${i % 2 === 0 && "odd"}">
          <h2>${title}</h2>
          <pre>${JSON.stringify(result, null, 2)}</pre>
        </div>`
    );

    res.write(
      `<h1>Advent of Code</h1>
      <style>
      h1,h2 {
        text-transform: uppercase;
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
