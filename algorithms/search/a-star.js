/**
 *
 * Credits to Adrienne Johnson for original
 * `Graph`, `PriorityQueue`, and test case
 * implementation which you can view here:
 * https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026
 *
 */

"use strict";

const { Graph } = require("../../data-structures/graphs/graph");
const {
  PriorityQueue,
} = require("../../data-structures/queues/priority-queue");
const testingUtils = require("../../utilities/testing-utils");
const testCases = [
  // Test Case 0: Get shortest path to the goal as expected.
  [
    [
      "Fullstack",
      "Starbucks",
      "Insomnia Cookies",
      "Cafe Grumpy",
      "Dublinger",
      "Dig Inn",
    ],
    [
      ["Fullstack", "Dublinger", 2],
      ["Fullstack", "Dig Inn", 7],
      ["Fullstack", "Starbucks", 6],
      ["Dublinger", "Starbucks", 3],
      ["Dublinger", "Dig Inn", 4],
      ["Dublinger", "Insomnia Cookies", 7],
      ["Starbucks", "Insomnia Cookies", 6],
      ["Cafe Grumpy", "Insomnia Cookies", 5],
      ["Cafe Grumpy", "Dig Inn", 9],
    ],
    "Fullstack",
    "Cafe Grumpy",
    `Path = [${[
      "Fullstack",
      "Dublinger",
      "Insomnia Cookies",
      "Cafe Grumpy",
    ].toString()}];
    Time = 14 minutes`,
  ],

  // Test Case 1: Don't make it to the goal.
  [
    [
      "Fullstack",
      "Starbucks",
      "Insomnia Cookies",
      "Cafe Grumpy",
      "Dublinger",
      "Dig Inn",
    ],
    [
      ["Fullstack", "Dublinger", 2],
      ["Fullstack", "Dig Inn", 7],
      ["Fullstack", "Starbucks", 6],
      ["Dublinger", "Starbucks", 3],
      ["Dublinger", "Dig Inn", 4],
      ["Dublinger", "Insomnia Cookies", 7],
      ["Starbucks", "Insomnia Cookies", 6],
      ["Cafe Grumpy", "Insomnia Cookies", 5],
      ["Cafe Grumpy", "Dig Inn", 9],
    ],
    "Fullstack",
    "Neverlands",
    "AStar did not reach the goal",
  ],
];
function AStar() {}

AStar.prototype.reconstructPath = function (
  cameFrom = new Set(),
  current = "",
  time = ""
) {
  const setPath = new Set();
  const last = current;
  const keys = Object.keys(cameFrom);

  for (const key of keys) {
    current = cameFrom[key];
    setPath.add(current);
  }

  setPath.add(last);

  return `Path = [${[...setPath]}];
    Time = ${time} minutes`;
};

/**
 * This is a basic `heuristic` method
 * for demo purposes.
 */
AStar.prototype.heuristic = function (current) {
  const guess = 2;
  return current * guess;
};

AStar.prototype.search = function (graphInfo) {
  // Create `graph` with `graphInfo`.
  const nodes = graphInfo[0],
    edges = graphInfo[1],
    start = graphInfo[2],
    end = graphInfo[3];

  const graph = new Graph();

  nodes.forEach((node) => graph.addNode(node));
  edges.forEach((edge) => graph.addEdge(...edge));

  const openSet = new PriorityQueue();
  const cameFrom = {};

  const gScore = {};
  const fScore = {};

  graph.nodes.forEach((node) => {
    gScore[node] = fScore[node] = Infinity;
  });

  openSet.enqueue([start, 0]);
  gScore[start] = 0;
  fScore[start] = this.heuristic(gScore[start]);

  while (!openSet.isEmpty()) {
    let current;
    let lowest = Infinity;

    openSet.collection.forEach((node) => {
      if (fScore[node[0]] < lowest) {
        current = node;
        lowest = fScore[node[0]];
      }
    });

    if (current[0] === end) {
      return this.reconstructPath(cameFrom, current[0], gScore[current[0]]);
    }

    openSet.remove(current[0]);

    graph.adjacencyList[current[0]].forEach((neighbor) => {
      const tentativeGScore = gScore[current[0]] + neighbor.weight;
      if (tentativeGScore < gScore[neighbor.node]) {
        cameFrom[neighbor.node] = current[0];
        gScore[neighbor.node] = tentativeGScore;
        fScore[neighbor.node] =
          gScore[neighbor.node] + this.heuristic(neighbor.weight);
        if (openSet.collection.indexOf([neighbor.node, neighbor.weight]) < 0) {
          openSet.enqueue([neighbor.node, neighbor.weight]);
        }
      }
    });
  }
  return "AStar did not reach the goal";
};

const testAStar = (testCase) => {
  const aStar = new AStar();
  return aStar.search(testCase);
};

testingUtils.runTestsTo(testAStar, testCases);

module.exports = exports = { AStar };
