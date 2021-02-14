const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData("7");
  const mockData = [
    "light red bags contain 1 bright white bag, 2 muted yellow bags.",
    "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
    "bright white bags contain 1 shiny gold bag.",
    "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
    "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
    "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
    "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
    "faded blue bags contain no other bags.",
    "dotted black bags contain no other bags."
  ];
  return {
    day7a: runA(data.split("\n").filter((item) => item))
    //  day7b: runB(data.split("\n"))
  };
};

const getContentDictionary = (data) => {
  const result = {};
  data.forEach((item) => {
    const [bag, contains] = item.split(" contain ");
    const bagKey = bag.replace(" bags", "");
    const arr = contains
      .split(/ bags, | bag, | bags.| bag./)
      .filter((item) => item)
      .map((item) => {
        const [qty, name] =
          item !== "no other" ? item.split(/(?<=^\S+)\s/) : [0, "no-other"];
        return { qty: parseInt(qty, 10), name };
      });
    Object.assign(result, {
      [bagKey]: {
        ...result[bagKey],
        ...arr.reduce(
          (obj, item) => ({
            ...obj,
            [item.name]: obj[item.name]
              ? obj[item.name].qty + item.qty
              : item.qty
          }),
          {}
        )
      }
    });
  });
  return result;
};

const countPosibilities = (dictionary, bagName) => {
  const dicKeys = Object.keys(dictionary);
  let parrents = [];
  const find = (name) => {
    dicKeys.forEach((dicKey) => {
      if (dictionary[dicKey][name]) {
        parrents = [...new Set([...parrents, dicKey])];
        find(dicKey);
      }
    });
  };
  find(bagName);

  return parrents.length;
};

const runA = (data) => {
  const dictionary = getContentDictionary(data);
  return countPosibilities(dictionary, "shiny gold");
};
const runB = (data) => data;

main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
