const fs = require("fs");

let structure = [];
let instructions = [];

function readData() {
	structure = [];
	instructions = [];
	let isInstructions = false;
	let data = fs.readFileSync("./input.txt", "utf8");
	while (data.length > 0) {
		let line = data.substring(0, data.indexOf("\n")); //note : there must be a \n at the end of the file
		data = data.substring(data.indexOf("\n") + 1);
		if (line.length == 0) {
			isInstructions = true;
			continue;
		}
		if (!isInstructions) {
			getLineStructure(line);
		} else {
			let amount = parseInt(
				line.substring(line.indexOf("move ") + 5, line.indexOf(" from"))
			);
			let from = parseInt(
				line.substring(line.indexOf("from ") + 5, line.indexOf(" to"))
			);
			let to = parseInt(
				line.substring(line.indexOf("to ") + 3, line.length)
			);
			instructions.push([amount, from - 1, to - 1]);
		}
	}
}

function getLineStructure(line) {
	counter = 0;
	for (let i = 1; i < line.length; i += 4) {
		if (line[i - 1] === "[") {
			if (!structure[counter]) structure[counter] = [];
			structure[counter].push(line[i]);
		}
		counter++;
	}
}

(function part1() {
	readData();
	for (let i = 0; i < instructions.length; i++) {
		let [amount, from, to] = instructions[i];
		let aux = structure[from].splice(0, amount);
		let inverted = invert(aux);
		structure[to] = inverted.concat(structure[to]);
	}
	console.log(getOutput());
})();

(function part2() {
	readData();
	for (let i = 0; i < instructions.length; i++) {
		let [amount, from, to] = instructions[i];
		let aux = structure[from].splice(0, amount);
		structure[to] = aux.concat(structure[to]);
	}
	console.log(getOutput());
})();

function invert(arr) {
	let aux = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		aux.push(arr[i]);
	}
	return aux;
}

function getOutput() {
	let output = "";
	for (let i = 0; i < structure.length; i++) {
		output += structure[i][0];
	}
	return output;
}
