const { fetchData } = require("../utils");
const main = async () => {
  const data = await fetchData(4);
  return {
    day4a: runA(data.split("\n\n")),
    day4b: runB(data.split("\n\n"))
  };
};

const extract = (item, type) => {
  return item.split(type).length > 1
    ? item.replace(/\n/g, " ").split(type)[1].split(" ")[0].replace(":", "")
    : undefined;
};

const runA = (data) => {
  const result = data
    .map((item) => {
      const obj = {};
      const byr = extract(item, "byr"); //(Birth Year)
      byr && Object.assign(obj, { byr });
      const iyr = extract(item, "iyr"); //(Issue Year)
      iyr && Object.assign(obj, { iyr });
      const eyr = extract(item, "eyr"); //(Expiration Year)
      eyr && Object.assign(obj, { eyr });
      const hgt = extract(item, "hgt"); //(Height)
      hgt && Object.assign(obj, { hgt });
      const hcl = extract(item, "hcl"); //(Hair Color)
      hcl && Object.assign(obj, { hcl });
      const ecl = extract(item, "ecl"); //(Eye Color)
      ecl && Object.assign(obj, { ecl });
      const pid = extract(item, "pid"); //(Passport ID)
      pid && Object.assign(obj, { pid });
      const cid = extract(item, "cid"); //(Country ID)
      cid && Object.assign(obj, { cid });
      return obj;
    })
    .filter(
      (item) =>
        (!item.cid && Object.keys(item).length >= 7) ||
        Object.keys(item).length === 8
    );
  return result.length;
};

const runB = (data) => {
  const validate = (key, value) => {
    const validator = {
      byr: (v) => v >= 1920 && v <= 2002,
      iyr: (v) => v >= 2010 && v <= 2020,
      eyr: (v) => v >= 2020 && v <= 2030,
      hgt: (v) => {
        if (v.includes("cm")) {
          const value = parseInt(v.split("cm")[0], 10);
          return value >= 150 && value <= 193;
        }
        if (v.includes("in")) {
          const value = parseInt(v.split("cm")[0], 10);
          return value >= 59 && value <= 76;
        }
      },
      hcl: (v) => /^#[0-9A-F]{6}$/i.test(v),
      ecl: (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
      pid: (v) => v.length === 9
    };
    return validator[key] ? validator[key](value) : true;
  };

  const result = data
    .map((item) => {
      const obj = {};
      const byr = extract(item, "byr"); //(Birth Year)
      byr && Object.assign(obj, { byr });
      const iyr = extract(item, "iyr"); //(Issue Year)
      iyr && Object.assign(obj, { iyr });
      const eyr = extract(item, "eyr"); //(Expiration Year)
      eyr && Object.assign(obj, { eyr });
      const hgt = extract(item, "hgt"); //(Height)
      hgt && Object.assign(obj, { hgt });
      const hcl = extract(item, "hcl"); //(Hair Color)
      hcl && Object.assign(obj, { hcl });
      const ecl = extract(item, "ecl"); //(Eye Color)
      ecl && Object.assign(obj, { ecl });
      const pid = extract(item, "pid"); //(Passport ID)
      pid && Object.assign(obj, { pid });
      const cid = extract(item, "cid"); //(Country ID)
      cid && Object.assign(obj, { cid });
      return obj;
    })
    .filter(
      (item) =>
        (!item.cid && Object.keys(item).length >= 7) ||
        Object.keys(item).length === 8
    )
    .filter((item) => {
      return Object.entries(item).every(([key, value]) => validate(key, value));
    });
  return result.length;
};

// main().then((r) => console.log(JSON.stringify(r, null, 2)));
module.exports = main;
