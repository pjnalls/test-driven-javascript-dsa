"use strict";

const { Graph }= require("../data-structures/graphs/graph");
const { PriorityQueue } = require("../data-structures/queues/priority-queue");
const testingUtils = require("../utilities/testing-utils");
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
    "Fullstack",
    "Cafe Grumpy",
    `Path = [${[
      "Fullstack",
      "Dublinger",
      "Insomnia Cookies",
      "Cafe Grumpy"
    ].toString()}];
    Time = 14 minutes`,
  ],
];
const dijkstra = (graphInfo) => {
    const nodes = graphInfo[0], 
      edges = graphInfo[1], 
      start = graphInfo[2], 
      end = graphInfo[3];

    const graph = new Graph();
    
    nodes.forEach((node) => graph.addNode(node));
    edges.forEach((edge) => graph.addEdge(...edge));

    const pq = new PriorityQueue(),
      distances = {},
      previous = {};

    graph.nodes.forEach((node) => {
      distances[node] = Infinity;
    });
    distances[start] = 0;
    pq.enqueue([start, 0]);

    while (!pq.isEmpty()) {
      const curr = pq.dequeue()[0];
      graph.adjacencyList[curr]
        .forEach((neighbor) => {
        let distance = 
          distances[curr] + neighbor.weight;
        if (distance < distances[neighbor.node]) {
          distances[neighbor.node] = distance;
          previous[neighbor.node] = curr;
          pq.enqueue([neighbor.node, distance])
        }
      });
    }

    let path = [end],
      prev = end;
    while (prev !== start) {
      path.unshift(previous[prev]);
      prev = previous[prev];
    }
    
    return `Path = [${path}];
    Time = ${distances[end]} minutes`;
  };

  testingUtils.runTestsTo(dijkstra, testCases);
  