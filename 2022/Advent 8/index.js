const allDirections = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
];
const fs = require("fs");
const matrix = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n")
	.map((row) => row.split(""));

class Visibility {
	constructor(visible, score) {
		this.visible = visible;
		this.score = Number(score);
	}
}

function solve() {
	let visibles = 0;
	let maxScore = 0;
	let amountInBorders = 2 * matrix.length + 2 * matrix[0].length - 4;
	visibles += amountInBorders;
	for (let i = 1; i < matrix.length - 1; i++) {
		for (let j = 1; j < matrix[i].length - 1; j++) {
			let results = allDirections
				.map((direction) => getVisibility(matrix, [i, j], direction))
				.reduce(
					(a, b) =>
						new Visibility(
							a.visible || b.visible,
							a.score * b.score
						)
				);
			if (results.visible) {
				visibles++;
			}
			if (results.score > maxScore) {
				maxScore = results.score;
			}
		}
	}
	console.log(`Part 1: ${visibles}`);
	console.log(`Part 2: ${maxScore}`);
}

function getVisibility(matrix, initialPos, direction) {
	let [x0, y0] = initialPos;
	let referenceHeight = matrix[x0][y0];
	let i = 1;
	let newPos = [x0 + direction[0] * i, y0 + direction[1] * i];
	while (isInsideMatrix(matrix, newPos)) {
		let currentHeight = matrix[newPos[0]][newPos[1]];
		if (currentHeight >= referenceHeight) {
			return new Visibility(false, i);
		}
		i++;
		newPos = [x0 + direction[0] * i, y0 + direction[1] * i];
	}
	return new Visibility(true, i - 1);
}

function isInsideMatrix(matrix, pos) {
	return (
		pos[0] >= 0 &&
		pos[0] < matrix.length &&
		pos[1] >= 0 &&
		pos[1] < matrix[0].length
	);
}

solve();
