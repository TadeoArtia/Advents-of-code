const fs = require("fs");
const movements = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n")
	.map((line) => line.split(" "));

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	areEqual(point) {
		return this.x === point.x && this.y === point.y;
	}
}

function solver(knots) {
	visited = [];
	let row = createRow(knots);
	let headPosition = new Point(0, 0);
	for (let move of movements) {
		let direction = move[0];
		let distance = parseInt(move[1]);
		for (let i = 0; i < distance; i++) {
			moveHead(headPosition, direction);
			for (let j = 0; j < row.length; j++) {
				previousKnot = j == 0 ? headPosition : row[j - 1];
				let knot = row[j];
				moveKnot(knot, previousKnot);
				if (j == row.length - 1 && !wasVisited(knot)) {
					visited.push(new Point(knot.x, knot.y));
				}
			}
		}
	}
	console.log(visited.length);
}

function wasVisited(point) {
	return visited.some((visitedPoint) => visitedPoint.areEqual(point));
}

function createRow(size) {
	let row = [];
	for (let i = 0; i < size; i++) {
		let point = new Point(0, 0);
		row.push(point);
	}
	return row;
}

function moveHead(currentPosition, direction) {
	switch (direction) {
		case "U":
			currentPosition.y++;
			break;
		case "D":
			currentPosition.y--;
			break;
		case "L":
			currentPosition.x--;
			break;
		case "R":
			currentPosition.x++;
			break;
	}
}

function moveKnot(tailPosition, headPosition) {
	if (tailPosition.x == headPosition.x || tailPosition.y == headPosition.y) {
		if (tailPosition.x - headPosition.x < -1) {
			tailPosition.x++;
		}
		if (tailPosition.x - headPosition.x > 1) {
			tailPosition.x--;
		}
		if (tailPosition.y - headPosition.y < -1) {
			tailPosition.y++;
		}
		if (tailPosition.y - headPosition.y > 1) {
			tailPosition.y--;
		}
	} else {
		if (tailPosition.x - headPosition.x < -1) {
			tailPosition.x++;
			tailPosition.y < headPosition.y
				? tailPosition.y++
				: tailPosition.y--;
		}
		if (tailPosition.x - headPosition.x > 1) {
			tailPosition.x--;
			tailPosition.y < headPosition.y
				? tailPosition.y++
				: tailPosition.y--;
		}
		if (tailPosition.y - headPosition.y < -1) {
			tailPosition.y++;
			tailPosition.x < headPosition.x
				? tailPosition.x++
				: tailPosition.x--;
		}
		if (tailPosition.y - headPosition.y > 1) {
			tailPosition.y--;
			tailPosition.x < headPosition.x
				? tailPosition.x++
				: tailPosition.x--;
		}
	}
}

solver(1);
solver(9);
