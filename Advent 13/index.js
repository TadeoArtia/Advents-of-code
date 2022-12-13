const READFROM = "./input.txt";

function parseData() {
  const fs = require("fs");

  const parsedPairs = fs
    .readFileSync(READFROM, "utf8")
    .split("\n\n")
    .map((p) => p.split("\n"))
    .map(([a, b]) => [JSON.parse(a), JSON.parse(b)]);

  return parsedPairs;
}

function part1() {
  let data = parseData();
  let inOrder = [];
  for (let i = 0; i < data.length; i++) {
    let [first, second] = data[i];
    if (getOrder(first, second) > 0) {
      inOrder.push(i + 1);
    }
  }
  console.log("Part 1: " + inOrder.reduce((a, b) => a + b, 0));
}

function getOrder(first, second) {
  if (Array.isArray(first) && !Array.isArray(second)) { //first is array, second is not
    return getOrder(first, [second]);
  }
  if (!Array.isArray(first) && Array.isArray(second)) { //first is not array, second is
    return getOrder([first], second);
  }
  if (!Array.isArray(first) && !Array.isArray(second)) { //both are not arrays
    return second - first; //get int order
  }
  if (Array.isArray(first) && Array.isArray(second)) {
    let firstIndex = 0;
    let secondIndex = 0;
    while (firstIndex < first.length && secondIndex < second.length) {
      let firstVal = first[firstIndex];
      let secondVal = second[secondIndex];
      let result = getOrder(firstVal, secondVal);
      if (result !== 0) {
        return result;
      }

      firstIndex++;
      secondIndex++;
    }

    if (firstIndex < first.length && secondIndex >= second.length) {
      //second is over
      return -1;
    }
    if (firstIndex >= first.length && secondIndex < second.length) {
      //first is over
      return 1;
    }
    if (firstIndex >= first.length && secondIndex >= second.length) {
      //both are over need to check next positions
      return 0;
    }
  }
}

part1();

function part2() {
  const fs = require("fs");
  let parsedPairs = fs
    .readFileSync(READFROM, "utf8")
    .split("\n\n")
    .map((elem) => elem.split("\n"))
    .reduce((a, b) => a.concat(b))
    .map((elem) => JSON.parse(elem));

  parsedPairs = parsedPairs.concat([[[2]], [[6]]]);

  parsedPairs.sort((a, b) => -getOrder(a, b));

  let result = findIndex(parsedPairs, [[[2]], [[6]]]).reduce(
    (a, b) => a * b,
    1
  );
  console.log("Part 2: " + result);
}

function findIndex(parsedPairs, elem) {
  let indexes = [];
  for (let i = 0; i < parsedPairs.length; i++) {
    for (let j = 0; j < elem.length; j++) {
      if (areEqual(parsedPairs[i], elem[j])) {
        indexes.push(i + 1);
      }
    }
  }
  return indexes;
}

function areEqual(first, second) {
  if (!Array.isArray(first) && !Array.isArray(second)) {
    return first === second;
  }
  if (Array.isArray(first) && Array.isArray(second)) {
    return (
      areEqual(first[0], second[0]) && areEqual(first.shift(), second.shift())
    );
  }
  return false;
}

part2();
