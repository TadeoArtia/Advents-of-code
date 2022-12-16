const READ_FROM = "./input.txt";

function mostCommons(data) {
    let output = "";
    for (let j = 0; j < data[0].length; j++) {
        let ones = 0;
        let zeroes = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i][j] === "1") {
                ones++;
            } else {
                zeroes++;
            }
        }
        if (ones > zeroes) {
            output += "1";
        } else {
            output += "0";
        }
    }
    return output;
}

function mostCommonInPlace(data, i) {
    let zeroes = 0;
    let ones = 0;
    for (let j = 0; j < data.length; j++) {
        if (data[j][i] === "1") {
            ones++;
        } else {
            zeroes++;
        }
    }
    return [zeroes, ones];
}

function filterData(data, filterCondition) {
    let output = "";
    let aux = [...data]
    for (let i = 0; i < aux[0].length; i++) {
        let info = mostCommonInPlace(aux, i);
        let mostCommon = info[0] > info[1] ? "0" : info[1] > info[0] ? "1" : "1";
        output += mostCommon;
        aux = aux.filter(filterCondition ? (x) => x[i] === mostCommon : (x) => x[i] !== mostCommon);
        if (aux.length === 1) {
            break;
        }
        
    }
    return aux[0];
}


function part1() {
    const fs = require("fs");
    const data = fs
        .readFileSync(READ_FROM, "utf8")
        .split("\n")

    let mostCommon = mostCommons(data)
    let inverted = mostCommon.split("").map(x => x === "1" ? "0" : "1").join("");

    let filtered1 = filterData(data, true);
    let filtered2 = filterData(data, false);

    console.log(filtered1);
    console.log(filtered2);

    console.log(getFromBinary(mostCommon) * getFromBinary(inverted));
    console.log(getFromBinary(filtered1) * getFromBinary(filtered2));


}

function getFromBinary(binary) {
    return parseInt(binary, 2);
}


part1();