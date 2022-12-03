const fs = require("fs");

function getValue(letter) {
	let value = letter.charCodeAt(0) - 96;
	if (value <= 0) {
		value += 58;
	}
	return value;
}

function findRepeatedCharacters(str1, str2) {
    let repeated = [];
	for (let i = 0; i < str1.length; i++) {
		for (let j = 0; j < str2.length; j++) {
			if (str1[i] == str2[j]) {
				repeated.push(str1[i]);
			}
		}
	}
    return repeated;
}

const data = fs.readFileSync("./input.txt", "utf8");
const dataArr = data.split("\n");

let acum = 0;
for (let i = 0; i < dataArr.length; i++) {
	let str = dataArr[i];
	let str1 = str.substring(0, str.length / 2);
	let str2 = str.substring(str.length / 2, str.length);
	let repeatedCharacter = findRepeatedCharacters(str1, str2)[0];
	let value = getValue(repeatedCharacter);
	acum += value;
}

console.log(`parte 1: ${acum}`);

acum = 0;

for (let i = 0; i < dataArr.length - 2; i += 3) {
	let str1 = dataArr[i];
	let str2 = dataArr[i + 1];
	let str3 = dataArr[i + 2];
	let repeatedCharacter = findRepeatedCharacters(str3, findRepeatedCharacters(str1, str2).join(''))[0];
	let value = getValue(repeatedCharacter);
	acum += value;
}

console.log(`parte 2: ${acum}`);