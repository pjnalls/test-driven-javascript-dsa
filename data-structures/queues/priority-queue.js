/**
 * 
 * Credits to Adrienne Johnson for original `PriorityQueue`
 * implementation which you can view here:
 * https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026
 * 
 */

"use strict";

const testingUtils = require("../../utilities/testing-utils");
const testCases = [
  [3, 1, 4, 99, 2, 3, 7, `[${[1, 2, 3, 3, 4, 7, 99].toString()}]`],
];
function PriorityQueue() {
  this.collection = [];
}

PriorityQueue.prototype.enqueue = function (element) {
  if (this.isEmpty()) {
    this.collection.push(element);
  } else {
    for (let i = 1; i <= this.collection.length; i++) {
      if (
        (element[1] || element) <
        (this.collection[i - 1][1] || this.collection[i - 1])
      ) {
        this.collection.splice(i - 1, 0, element);
        return;
      }
    }
    this.collection.push(element);
  }
};

PriorityQueue.prototype.dequeue = function () {
  return this.collection.shift();
};

PriorityQueue.prototype.remove = function (element) {
  for (let i = 0; i < this.collection.length; i++) {
    if (this.collection[i][0] === element) {
      this.collection.splice(i, 1)
    };
  }
};

PriorityQueue.prototype.isEmpty = function () {
  if (this.collection.length === 0) return true;
  else false;
};

const prioritizeIntegers = (integers) => {
  const pq = new PriorityQueue();
  integers.forEach((integer) => pq.enqueue(integer));
  return `[${pq.collection.toString()}]`;
};

testingUtils.runTestsTo(prioritizeIntegers, testCases);

module.exports = exports = { PriorityQueue };
