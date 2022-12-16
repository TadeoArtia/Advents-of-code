const fs = require("fs");

class Valve {
  constructor(name, value, goesTo) {
    this.name = name;
    this.value = value;
    this.goesTo = goesTo;
    this.opened = false;
  }
}

class BactrackingObjects {
  constructor() {
    this.best = 0;
  }
}

function getInput(file) {
  let data = fs.readFileSync(file, "utf8")
    .split("\n")
    .map((x) => new Valve(x.substring(6, 8), parseInt(x.split("rate=")[1].split(";")[0]), x.replaceAll("to valves", "to valve").split("to valve ")[1].split(",").map(x => x.trim())));

  return data;
}


function findBestPath(valves, objects, currentValve, currentPressure, minutesLeft) {
  //console.log(currentPressure)
  if (minutesLeft <= 0) return;
  if (currentPressure > objects.best) {
    objects.best = currentPressure;
  }
  for (let i = 0; i < currentValve.goesTo.length; i++) {
    let nextValve = valves.find(x => x.name == currentValve.goesTo[i]);
    if(!currentValve.opened) {
      currentValve.opened = true;
      let pressureIfOpened = currentPressure + (currentValve.value * (minutesLeft - 1));
      findBestPath(valves, objects, nextValve, pressureIfOpened, minutesLeft - 2);
    }
    findBestPath(valves, objects, nextValve, currentPressure, minutesLeft - 1);
  }
}


function part1(filename) {
  let valves = getInput(filename);
  console.log(valves);
  let objects = new BactrackingObjects();
  findBestPath(valves, objects, valves[0], 0, 30);
  console.log("Part 1 for file " + filename + " is:" + objects.best);

}

part1("test.txt");