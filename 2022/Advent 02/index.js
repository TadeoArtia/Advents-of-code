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

function getRoundResult1(move1, move2) {
	let value = values.get(move2);
	if (move1 == move2) {
		return value + 3;
	}
	if (move1 == "A" && move2 == "B") {
		return value + 6;
	}
	if (move1 == "B" && move2 == "C") {
		return value + 6;
	}
	if (move1 == "C" && move2 == "A") {
		return value + 6;
	}
	return value;
}

function getRoundResult2(move1, move2) {
	if (move2 == "X") {
		if (move1 == "A") {
			return getRoundResult1(move1, "C");
		} else if (move1 == "B") {
			return getRoundResult1(move1, "A");
		} else if (move1 == "C") {
			return getRoundResult1(move1, "B");
		}
	}
    else if (move2 == "Y") {
        return getRoundResult1(move1, move1);
    }
    else{
        if(move1 == "A"){
            return getRoundResult1(move1, "B");
        }
        else if(move1 == "B"){
            return getRoundResult1(move1, "C");
        }
        else if(move1 == "C"){
            return getRoundResult1(move1, "A");
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
	let result1 = 0;
	let result2 = 0;
	for (let i = 0; i < play1.length; i++) {
		let move1 = play1[i];
		let move2 = secret.get(play2[i]);
		result1 += getRoundResult1(move1, move2);
		result2 += getRoundResult2(move1, play2[i]);
	}
	console.log(`Part 1 result: ${result1}`);
	console.log(`Part 2 result: ${result2}`);
})();
