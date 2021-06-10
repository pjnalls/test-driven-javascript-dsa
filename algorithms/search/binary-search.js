/*
 *
 *  Search for an element in a sorted array and return it's index.
 *
 */

"use strict";

const testingUtils = require("../../utilities/testing-utils");

const testCases = [
  // Case 1 (Average & Worst): [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3 => 2
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 2],

  // Case 2 (Best): [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5 => 4
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 4],

  // Case 3: [2, 5, 8, 12, 15, 23, 36, 45, 54], 2 => 0
  [2, 5, 8, 12, 15, 23, 36, 45, 54, 2, 0],

  // Case 4: [1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 10, 10, 11, 13], 13 => 14
  [1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 10, 10, 11, 13, 13, 14],

  // Case 5: [1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 10, 10, 11, 13], 3 => 3
  [1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 10, 10, 11, 13, 3, 3],

  // Case 6 (Edge 1): ['01', '02', '02', '03', '03', '03', '04', '05', '06', '07', '08'], '08' => 10
  ["01", "02", "02", "03", "03", "03", "04", "05", "06", "07", "08", "08", 10],

  // Case 7 (Edge 2): ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 'c' => 2
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "c", 2],

  // Case 8 (Edge 3): [2, 5, 8, 12, 15, 23, 36, 45, 54], 99 => -1
  [2, 5, 8, 12, 15, 23, 36, 45, 54, 99, -1],
];

const indexFromBinarySearchFor = (sortedArray, target = sortedArray.pop()) => {
  let mid,
    low = 0,
    high = sortedArray.length - 1;

  while (low <= high) {
    mid = Math.floor((high + low) / 2);

    if (target === sortedArray[mid]) return mid;
    else if (target > sortedArray[mid]) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
};

testingUtils.runTestsTo(indexFromBinarySearchFor, testCases);
