const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

let marker = -1;
for(let i =0; i< data.length && marker < 0; i++){
    if(isMarker(data.substr(i,4))){
        marker = i+4;
    }
}
console.log(marker);


function isMarker(str){
    let characters = [];
    for(let i = 0; i < str.length; i++){
        if(characters.indexOf(str[i]) >= 0){
            return false;
        }
        characters.push(str[i]);
    }
    return true
}

marker = -1;
for(let i =0; i< data.length && marker < 0; i++){
    if(isMarker(data.substr(i,14))){
        marker = i+14;
    }
}
console.log(marker);