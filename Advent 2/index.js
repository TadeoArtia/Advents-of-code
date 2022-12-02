const { assert } = require("console");
const fs = require("fs");

// A - piedra
// B - papel
// C - tijera

let play1 = [];
let play2 = [];

let values = new Map([
	["A", 1],
	["B", 2],
	["C", 3],
]);

let secret = new Map([
	["X", "A"],
	["Y", "B"],
	["Z", "C"],
]);

function getRoundResult(move1, move2) {
	if (move1 == move2) {
		return 3;
	}
	if (move1 == "A") {
		if (move2 == "B") {
			return 6;
		}
		if (move2 == "C") {
			return 0;
		}
	}
	if (move1 == "B") {
		if (move2 == "A") {
			return 0;
		}
		if (move2 == "C") {
			return 6;
		}
	}
	if (move1 == "C") {
		if (move2 == "A") {
			return 6;
		}
		if (move2 == "B") {
			return 0;
		}
	}
}

(function readData() {
	const data = fs.readFileSync("./input.txt", "utf8");
	const dataArr = data.split("\n");
	for (let x of dataArr) {
		const [first, second] = x.split(" ");
		play1.push(first);
		play2.push(second);
	}
    console.log(play2);
	assert(play1.length === play2.length);
})();

(function playGame() {
	let result = 0;
	for (let i = 0; i < play1.length; i++) {
		let move1 = play1[i];
		let move2 = secret.get(play2[i]);
		let moveValue = values.get(move2);
		let roundScore = getRoundResult(move1, move2);
        console.log(move1);
        console.log(move2);
        result += moveValue + roundScore;
	}
	console.log(result);
})();

