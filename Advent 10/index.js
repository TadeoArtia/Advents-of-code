const fs = require("fs");
const movements = fs.readFileSync("./input.txt", "utf8").split("\n");

const ADD = "addx";

let allPoints = [];

function part1() {
	let value = 1;
	allPoints.push(value);
	for (let movement of movements) {
		let [instruction, amount] = movement.split(" ");
		if (instruction == ADD) {
			allPoints.push(value);
			value += parseInt(amount);
		}
		allPoints.push(value);
	}
	let interesting = findInteresting();
	console.log(interesting.reduce((a, b) => a + b));
}

function findInteresting() {
	let interesting = [];
	for (let i = 0; i < allPoints.length; i++) {
		if (isInteresting(i + 1)) interesting.push(allPoints[i] * (i + 1));
	}
	return interesting;
}

function isInteresting(cycle) {
	if (cycle < 20 || cycle > 220) return false;
	if (cycle == 20) return true;
	return isInteresting(cycle - 40);
}

function drawCTR() {
	let i = 0;
	while (i < 240) {
		let str = "";
		for (let j = 0; j < 40; j++, i++) {
			let value = allPoints[i];
			if (isVisible(value, j)) {
				str += "X";
			} else {
				str += " ";
			}
		}
		console.log(str);
	}
}

function isVisible(value, cycle) {
	if (value == cycle || value + 1 == cycle || value - 1 == cycle) return true;
	return false;
}

part1();
drawCTR();
