const fs = require("fs");
const matrix = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n")
	.map((line) => line.split(""));

const movements = [
	[1,0], //R
    [0,1], //D
    [-1,0], //L
    [0,-1] //U
];

class Graph {
	// Constructor
	constructor(v) {
		this.V = v;
		this.adj = new Array(v);
		for (let i = 0; i < v; i++) this.adj[i] = [];
	}

	// Function to add an edge into the graph
	addEdge(v, w) {
		// Add w to v's list.
		this.adj[v].push(w);
	}
}

let graph = createGraph();

function createGraph() {
	let graph = new Graph(matrix.length * matrix[0].length);
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			for (let movement of movements) {
				let x = i + movement[1];
				let y = j + movement[0];
				if (
					x >= 0 &&
					x < matrix.length &&
					y >= 0 &&
					y < matrix[x].length
				) {
					if (canClimb(matrix[i][j], matrix[x][y])) {
						graph.addEdge(getIndex(i, j), getIndex(x, y));
					}
				}
			}
		}
	}
	return graph;
}

function dijkstra(root) {
	const queue = [];
	queue.push(root);

    //add edges array and initialize it with root
    const edges = new Array(graph.V).fill(Infinity);
    edges[root] = 0;

	while (queue.length > 0) {
		let v = queue.shift();
		for (let nextNode of graph.adj[v]) {
			if (edges[nextNode] > edges[v] + 1) {
				queue.push(nextNode);
                edges[nextNode] = edges[v] + 1
			}
		}
	}

	return edges;
}

function canClimb(a, b) {
	if (b === "E") return a === "z" || a === "y";
	if (a === "S") return b === "a";
	return (
		a.charCodeAt(0) + 1 === b.charCodeAt(0) ||
		a.charCodeAt(0) >= b.charCodeAt(0)
	);
}

function getIndex(x, y) {
	return x * matrix[x].length + y;
}

function locate(char) {
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] === char) return [i, j];
		}
	}
}

let initialPoint = locate("S");
let finalPoint = locate("E");
let initialIndex = getIndex(initialPoint[0], initialPoint[1]);
let result = dijkstra(initialIndex);
console.log(result[getIndex(finalPoint[0], finalPoint[1])]);

function part2(){
	let allMins = []
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] === "a" || matrix[i][j] == "S"){
				let initialIndex = getIndex(i, j);
				let result = dijkstra(initialIndex);
				allMins.push(result[getIndex(finalPoint[0], finalPoint[1])])
			}
		}
	}
	console.log(allMins.sort((a,b) => a-b)[0]);
}

part2();