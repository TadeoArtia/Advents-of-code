const READ_FROM = "./input.txt";

function getIncrements(data) {
  let increments = 0;
  for (let i = 1; i < data.length; i++) {
    let previous = data[i - 1];
    let current = data[i];
    if (current > previous) {
      increments++;
    }
  }

  return increments;
}

function part1() {
  const fs = require("fs");
  const data = fs
    .readFileSync(READ_FROM, "utf8")
    .split("\n")
    .map((x) => parseInt(x));

  let increments = getIncrements(data);
  console.log("Part 1: " + increments);
}

function part2() {
  const fs = require("fs");
  const data = fs
    .readFileSync(READ_FROM, "utf8")
    .split("\n")
    .map((x) => parseInt(x));

  let windows = [];
  for (let i = 0; i < data.length - 2; i++) {
    let acum = 0;
    for (let j = i; j < i + 3; j++) {
      acum += data[j];
    }
    windows.push(acum);
  }

  let increments = getIncrements(windows);

  console.log("Part 2: " + increments);
}

part1();
part2();
