const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
const dataArr = data.split("\n");

let acum1 = 0;
let acum2 = 0;

for (let i = 0; i < dataArr.length; i++) {
	let intervals = dataArr[i]
		.split(",")
		.map((x) => x.split("-").map((y) => parseInt(y)));
	acum1 += isFullOverlap(intervals[0], intervals[1]);
	acum2 += getOverlapNumber(intervals[0], intervals[1]);
}

console.log(`Result fisrst part: ${acum1}`);
console.log(`Result second part: ${acum2}`);

function isFullOverlap(interval1, interval2) {
	if (interval1[0] <= interval2[0]) {
		if (interval1[1] >= interval2[1]) {
			return 1;
		}
	}
	if (interval2[0] <= interval1[0]) {
		if (interval2[1] >= interval1[1]) {
			return 1;
		}
	}
	return 0;
}

function getOverlapNumber(interval1, interval2) {
	//swap 1 always starts before.
	if (interval1[0] >= interval2[0]) {
		let aux = interval1;
		interval1 = interval2;
		interval2 = aux;
	}

	if (interval1[1] >= interval2[0]) {
		return 1;
	}

	return 0;
}
