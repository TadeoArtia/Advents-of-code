class Monkey {
	constructor(items, operation, divisor, trueCondition, falseCondition) {
		this.items = items;
		this.operation = operation;
		this.divisor = divisor;
		this.trueCondition = trueCondition;
		this.falseCondition = falseCondition;
		this.itemsInspected = 0;
	}
}

let monkeys = [];

function parseMonkeys() {
    monkeys = [];
	const fs = require("fs");
	const monkeysData = fs.readFileSync("./input.txt", "utf8").split("\n\n");
	for (let monkeyData of monkeysData) {
		parseMonkey(monkeyData);
	}
}

function parseMonkey(monkey) {
	let lines = monkey.split("\n");
	let items = lines[1]
		.split("Starting items: ")[1]
		.split(", ")
		.map((x) => parseInt(x));
	let operation = lines[2].split("Operation: new = ")[1];
	let divisor = parseInt(lines[3].split("divisible by ")[1]);
	let trueCondition = parseInt(
		lines[4].split("If true: throw to monkey ")[1]
	);
	let falseCondition = parseInt(
		lines[5].split("If false: throw to monkey ")[1]
	);
	let monkeyObj = new Monkey(
		items,
		operation,
		divisor,
		trueCondition,
		falseCondition
	);
	monkeys.push(monkeyObj);
}

function part1() {
	parseMonkeys();
	let control = function (a) {
		return Math.floor(a / 3);
	};
	for (let i = 0; i < 20; i++) {
		for (let monkey of monkeys) {
			processMonkey(monkey, control);
		}
	}
	monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
	console.log(
		`Part 1: ${monkeys[0].itemsInspected * monkeys[1].itemsInspected} `
	);
}

function processMonkey(monkey, control) {
	for (let i = 0; i < monkey.items.length; i++) {
		let item = monkey.items[i];
		let newVal = eval(monkey.operation.replaceAll("old", item));
		newVal = control(newVal);
		if (newVal % monkey.divisor == 0) {
			monkeys[monkey.trueCondition].items.push(newVal);
		} else {
			monkeys[monkey.falseCondition].items.push(newVal);
		}
		monkey.itemsInspected++;
	}
	monkey.items = [];
}

function part2() {
	parseMonkeys();

	const controlNumber = monkeys
		.map((monkey) => monkey.divisor)
		.reduce((a, b) => a * b);

	let control = function (a) {
		return a % controlNumber;
	};

	for (let i = 0; i < 10000; i++) {
		for (let monkey of monkeys) {
			processMonkey(monkey, control);
		}
	}

	monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
	console.log(
		`Part 2: ${monkeys[0].itemsInspected * monkeys[1].itemsInspected} `
	);
}

part1();
part2();
