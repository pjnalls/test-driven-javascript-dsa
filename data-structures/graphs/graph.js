/**
 * 
 * Credits to Adrienne Johnson for original `Graph` and test case
 * implementation which you can view here:
 * https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026
 * 
 */

"use strict";

const testingUtils = require("../../utilities/testing-utils");
const testCases = [
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
    `Graph.nodes = [${[
      "Fullstack",
      "Starbucks",
      "Insomnia Cookies",
      "Cafe Grumpy",
      "Dublinger",
      "Dig Inn",
    ].toString()}]`,
  ],
];

function Graph() {
  this.nodes = [];
  this.adjacencyList = {};
}

Graph.prototype.addNode = function (node) {
  this.nodes.push(node);
  this.adjacencyList[node] = [];
};

Graph.prototype.addEdge = function (node1, node2, weight) {
  this.adjacencyList[node1].push({ node: node2, weight: weight });
  this.adjacencyList[node2].push({ node: node1, weight: weight });
};

const graphCreated = (testCase) => {
  const graph = new Graph();
  testCase[0].forEach((node) => graph.addNode(node));
  testCase[1].forEach((edge) => graph.addEdge(...edge));
  return `Graph.nodes = [${graph.nodes.toString()}]`;
};

testingUtils.runTestsTo(graphCreated, testCases);

module.exports = exports = { Graph };
