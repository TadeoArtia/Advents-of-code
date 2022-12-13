const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");
const dataArr = data.split("\n");

let max1 = 0;
let max2 = 0;
let max3 = 0;
let acum = 0;
let termine = false;

for (let i = 0; i < dataArr.length; i++) {
    let x = dataArr[i];
	if (x != "") {
		acum += parseInt(x);
	} 
    if(x == "" || i == dataArr.length - 1){
		if (acum > max1) {
			max3 = max2;
			max2 = max1;
			max1 = acum;
		} else if (acum > max2) {
			max3 = max2;
			max2 = acum;
		} else if (acum > max3) {
			max3 = acum;
		}
		acum = 0;
		termine = false;
	}
}
console.log(max1)
console.log(max3 + max2 + max1);
