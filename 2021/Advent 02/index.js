const READ_FROM = "./test.txt";

function part1() {
  const fs = require("fs");
  const data = fs
    .readFileSync(READ_FROM, "utf8")
    .split("\n")
    .map((elem) => elem.split(" "))
    .map(([a, b]) => [a, parseInt(b)]);

let navigatioInfo = navigate1(data);
  console.log("Part 1: " + navigatioInfo[0] * navigatioInfo[1]);
}

function navigate1(instructions) {
  let depth = 0;
  let horizontal = 0;
  for (let instruction of instructions) {
    switch (instruction[0]) {
      case "forward":
        horizontal += instruction[1];
        break;
      case "down":
        depth += instruction[1];
        break;
      case "up":
        depth -= instruction[1];
        break;
      default:
        console.error("Error");
        break;
    }
  }
  return [depth, horizontal];
}

function part2() {
    const fs = require("fs");
    const data = fs
      .readFileSync(READ_FROM, "utf8")
      .split("\n")
      .map((elem) => elem.split(" "))
      .map(([a, b]) => [a, parseInt(b)]);
  
  let navigatioInfo = navigate2(data);
    console.log("Part 2: " + navigatioInfo[0] * navigatioInfo[1]);
  }
  
  function navigate2(instructions) {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;
    for (let instruction of instructions) {
      switch (instruction[0]) {
        case "forward":
          horizontal += instruction[1];
          depth += aim * instruction[1];
          break;
        case "down":
          aim += instruction[1];
          break;
        case "up":
          aim -= instruction[1];
          break;
        default:
          console.error("Error");
          break;
      }
    }
    return [depth, horizontal, aim];
  }

part1();
part2();
