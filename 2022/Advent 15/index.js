const fs = require("fs");

function parseData(file) {
	elementsInRow = [];
	let preliminarParse = [];
	fs.readFileSync(file, "utf8")
		.split("\n")
		.map((line) => preliminarParse.push(line.split(":")));

	let sensors = [];
	let beacons = [];

	preliminarParse.map(([s, b]) => {
		sensors.push(s.split("x=")[1].split(", y="));
		beacons.push(b.split("x=")[1].split(", y="));
	});

	sensors = sensors.map(([x, y]) => [parseInt(x), parseInt(y)]);
	beacons = beacons.map(([x, y]) => [parseInt(x), parseInt(y)]);

	return { sensors: sensors, beacons: beacons };
}

function getNonPosibleLocationsInRowOfInterest(sensor, beacon, rowOfInterest) {
	let sensorX = sensor[0];
	let sensorY = sensor[1];
	let beaconX = beacon[0];
	let beaconY = beacon[1];
	let distanceMax = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
	let distanceToRowOfInterest = Math.abs(sensorY - rowOfInterest);

	if (distanceToRowOfInterest > distanceMax) return []; // If the distance to the row of interest is greater than the distance to the beacon, it is not possible to reach the beacon from the row of interest

	let output = [];
	let x = sensorX;
	let distance = Math.abs(sensorY - rowOfInterest); //I start with the same x so its not counted here
	output.push(x);

	let iteration = 1;
	while (distance <= distanceMax) { //We push both xs to the left and to the right
		output.push(x - iteration);
		output.push(x + iteration);
		iteration++;
		distance =
			Math.abs(sensorY - rowOfInterest) +
			Math.abs(sensorX - (x + iteration));
	}

	return output;
}

function getNumberOfNonPossibleBeacons(sensors, beacons, rowOfInterest) {
	let output = [];

	for (let i = 0; i < sensors.length; i++) {
		let sensor = sensors[i];
		let beacon = beacons[i];
        output = output.concat(getNonPosibleLocationsInRowOfInterest(sensor, beacon, rowOfInterest));
	}

	output = [...new Set(output)];
	output = output.filter(
		(x) => !beacons.some((b) => b[0] === x && b[1] === rowOfInterest)
	);

	output.sort((a, b) => a - b);
	return output.length;
}

function part1(rowOfInterest, file) {
	const data = parseData(file);
	let amountOfNotPossible = getNumberOfNonPossibleBeacons(
		data.sensors,
		data.beacons,
		rowOfInterest
	);

	console.log(`Part 1. Input + ${file}, result: ${amountOfNotPossible}`);
}

function getPairInRow(row, sensor, beacon) {
	let distance =
		Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]); //Distance from sensor to beacon
	let distanceToRow = Math.abs(sensor[1] - row); //Distance from sensor to row
	let distanceLeft = distance - distanceToRow; //Distance left
	if (distanceLeft < 0) return []; //If the distance to the row is greater than the distance to the beacon, it is not possible to reach the row from the sensor.
	let maxBordersInRow = [sensor[0] - distanceLeft, sensor[0] + distanceLeft]; //min and max x in the interesting row
	return maxBordersInRow; 
}

function part2(maxRow, file) {

	const data = parseData(file);
	let sensors = data.sensors;
	let beacons = data.beacons;

	for (let row = 0; row <= maxRow; row++) { 
		
        let position = 0;
		while (position <= maxRow) {
			//Actually max column but they are the same
			let sensorFound = false;
			for (let i = 0; i < sensors.length && !sensorFound; i++) {
				let sensor = sensors[i];
				let beacon = beacons[i];
				let pair = getPairInRow(row, sensor, beacon);
				if (pair.length === 0) continue; // This sensor doesn't reach the row
				if (pair[0] > position) continue; // This sensor doesn't reach the position
				if (pair[1] < position) continue; // This sensor doesn't reach the position
				sensorFound = true;
				position = pair[1] + 1;
			}
			if (!sensorFound) {
				console.log(`Result for ${file}: ${4000000 * position + row}`);
				return;
			}
		}
	}
}

part1(10, "test.txt");
part1(2000000, "input.txt");

part2(20, "test.txt");
part2(4000000, "input.txt");