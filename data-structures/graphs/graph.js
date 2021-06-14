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

Graph.prototype.removeNode = function (node) {
  this.nodes.forEach((n, index) => {
    if (node === n) this.nodes.splice(index, 1);
  });
  delete this.adjacencyList[node];
};

Graph.prototype.removeEdge = function (node1, node2) {
  this.adjacencyList[node1].forEach((n, index) => {
    if (node2 === n.node) 
      this.adjacencyList[node1].splice(index, 1); 
  });
  this.adjacencyList[node2].forEach((n, index) => {
    if (node1 === n.node) 
      this.adjacencyList[node2].splice(index, 1); 
  });
}

const deleteNodesAndEdges = (graph) => {
  graph.addNode("Remove this node.");
  graph.addNode("Remove this other node.");
  graph.addEdge("Remove this node.", "Fullstack", 9);
  graph.addEdge("Remove this node.", "Remove this other node.", 9);
  graph.removeNode("Remove this other node.");
  graph.removeEdge("Remove this node.", "Fullstack");
  graph.removeNode("Remove this node.");;
};

const createGraph = (testCase) => {
  const graph = new Graph();
  testCase[0].forEach((node) => graph.addNode(node));
  testCase[1].forEach((edge) => graph.addEdge(...edge));

  deleteNodesAndEdges(graph);

  return `Graph.nodes = [${graph.nodes.toString()}]`;
};

testingUtils.runTestsTo(createGraph, testCases);

module.exports = exports = { Graph };
