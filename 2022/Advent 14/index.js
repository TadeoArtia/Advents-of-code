const fs = require('fs');

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(point) {
        return this.x === point.x && this.y === point.y;
    }

    static swap(point1, point2) {
        let tempX = point1.x;
        let tempY = point1.y;
        point1.x = point2.x;
        point1.y = point2.y;
        point2.x = tempX;
        point2.y = tempY;
    }
}

class Cave {
    constructor(source) {
        this.rocks = [];
        this.floor = 0;
        this.grains = [];
        this.minY = 0;
        this.source = source
        this.overflowed = false;
    }

    addGrain(grain) {
        if (this.grains.some(grainO => grain.x === grainO.x && grain.y === grainO.y)) return;
        this.grains.push(grain);
    }

    addRock(rock) {
        if (this.rocks.some(rockO => rock.x === rockO.x && rock.y === rockO.y)) return;
        this.rocks.push(rock);
        if (rock.y > this.minY) {
            this.minY = rock.y;
            this.floor = this.minY + 2;
        }
    }

    addLine(initialPoint, finalPoint) {
        if (initialPoint.x === finalPoint.x) {
            let initial = Math.min(initialPoint.y, finalPoint.y);
            let final = Math.max(initialPoint.y, finalPoint.y);
            for (let i = initial; i <= final; i++) {
                this.addRock(new Point(initialPoint.x, i));
            }
        } else if (initialPoint.y === finalPoint.y) {
            let initial = Math.min(initialPoint.x, finalPoint.x);
            let final = Math.max(initialPoint.x, finalPoint.x);
            for (let i = initial; i <= final; i++) {
                this.addRock(new Point(i, initialPoint.y));
            }
        }
    }

    isFree(point) {
        return !this.rocks.some(rock => rock.x === point.x && rock.y === point.y) &&
            !this.grains.some(grain => grain.x === point.x && grain.y === point.y) &&
            point.y < this.floor;
    }

    fall(point) {
        let gotStuck = false;
        let down = new Point(point.x, point.y + 1);
        let downLeft = new Point(point.x - 1, point.y + 1);
        let downRight = new Point(point.x + 1, point.y + 1);
        if (this.isFree(down)) {  // straight down
            Point.swap(point, down);
        } else if (this.isFree(downLeft)) {
            Point.swap(point, downLeft);
        } else if (this.isFree(downRight)) {
            Point.swap(point, downRight);
        } else {
            gotStuck = true;
        }
        if (point.y > this.minY) {
            this.overflowed = true;
        }
        return gotStuck;
    }

}

function parseData() {
    return fs.readFileSync('input.txt', 'utf8')
        .split("\n")
        .map((line) => line.split(' -> '))
        .map((elem) => elem.map((point) => point.split(",")))
        .map((line) => line.map((point) => new Point(parseInt(point[0]), parseInt(point[1]))));

}

function generateCave(data) {
    const cave = new Cave();
    cave.source = new Point(500, 0);

    for (let line of data) {
        for (let i = 1; i < line.length; i++) {
            cave.addLine(line[i - 1], line[i]);
        }
    }

    return cave;
}

function getNumberOfGrainsNeededToOverload(cave) {
    let grains = 0;
    while (!cave.overflowed) {
        let grain = new Point(cave.source.x, cave.source.y);
        let gotStuck;
        do {
            gotStuck = cave.fall(grain)
        } while (!gotStuck && !cave.overflowed);
        cave.addGrain(grain);
        grains++;
    }
    return grains -1;
}

function getNumberOfGrainsNeededToTouchSource(cave) {
    let grains = 0;
    let isInSource = false;
    while (!isInSource) {
        let grain = new Point(cave.source.x, cave.source.y);
        let gotStuck;
        do {
            gotStuck = cave.fall(grain)
        } while (!gotStuck);
        isInSource = cave.source.equals(grain);
        cave.addGrain(grain);
        grains++;
    }
    return grains;
}

function part1() {
    const data = parseData();
    const cave = generateCave(data);
    let result = getNumberOfGrainsNeededToOverload(cave);
    console.log(result);
}

function part2() {
    const data = parseData();
    const cave = generateCave(data);
    let result = getNumberOfGrainsNeededToTouchSource(cave);
    console.log(result);
}


part1();
part2();
        