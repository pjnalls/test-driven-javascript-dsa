const testingUtils = require("../../../utilities/testing-utils");
const testCases = [
  [1, 3, 21, 8, 1, 13, 5, 34, "in-order", "1, 1, 3, 5, 8, 13, 21, 34"],
  [1, 3, 21, 8, 1, 13, 5, 34, "pre", "1, 1, 3, 5, 8, 13, 21, 34"],
  [1, 3, 21, 8, 1, 13, 5, 34, "post", "1, 1, 3, 5, 8, 13, 21, 34"],
  [
    1,
    3,
    21,
    8,
    1,
    13,
    5,
    34,
    "tree",
    `
         8
        / \\
       3   34
      / \\ / \\
     1  5  13 34
    /
   1
`,
  ],
  [1, "in-order", "1"],
  [1, "pre", "1"],
  [1, "post", "1"],
  [
    "b",
    "f",
    "e",
    "d",
    "g",
    "c",
    "h",
    "a",
    "in-order",
    "a, b, c, d, e, f, g, h",
  ],
  ["b", "f", "e", "d", "g", "c", "h", "a", "pre", "a, b, c, d, e, f, g, h"],
  ["b", "f", "e", "d", "g", "c", "h", "a", "post", "a, b, c, d, e, f, g, h"],
  ["3", "2", "a", "1", "b", "in-order", "1, 2, 3, a, b"],
  ["3", "2", "a", "1", "b", "pre", "1, 2, 3, a, b"],
  ["3", "2", "a", "1", "b", "post", "1, 2, 3, a, b"],
  [3, 2, undefined, "in-order", "2, 3"],
  [3, 2, undefined, "pre", "2, 3"],
  [3, 2, undefined, "post", "2, 3"],
];

const Tree = function () {
  this.root = null;
  this.stringBuilder = "";
};

Tree.prototype.print = function (order, length = null) {
  if (order === "pre")
    for (const data of this.root.preOrderTraversal(this.root))
      this.stringBuilder += data;
  else if (order === "post")
    for (const data of this.root.postOrderTraversal(this.root))
      this.stringBuilder += data;
  else if (order === "in-order")
    for (const data of this.root.inOrderTraversal(this.root))
      this.stringBuilder += data;
  else {
    this.stringBuilder += "\n";

    for (let i = 0; i < length; i++) this.stringBuilder += " ";
    this.stringBuilder += `${this.root.data}`;
    for (let i = 0; i < length; i++) this.stringBuilder += " ";

    for (const data of this.root.printTree(this.root, length, 1))
      this.stringBuilder += data;
    
    return this.stringBuilder;
  }

  return this.stringBuilder.trim().split(" ").join(", ");
};

Tree.prototype.insert = function (data) {
  const node = new Node(data);
  this.root === null ? (this.root = node) : this.root.insert(node);
};

const Node = function (data, left = null, right = null) {
  this.data = data;
  this.left = left;
  this.right = right;
};

Node.prototype.insert = function (node) {
  if (node.data <= this.data)
    this.left === null ? (this.left = node) : this.left.insert(node);
  else this.right === null ? (this.right = node) : this.right.insert(node);
};

Node.prototype.inOrderTraversal = function* (node) {
  if (node !== null) {
    yield* this.inOrderTraversal(node.left);
    yield `${node.data} `;
    yield* this.inOrderTraversal(node.right);
  }
};

Node.prototype.preOrderTraversal = function* (node) {
  if (node !== null) {
    yield `${node.data} `;
    yield* this.preOrderTraversal(node.left);
    yield* this.preOrderTraversal(node.right);
  }
};

Node.prototype.postOrderTraversal = function* (node) {
  if (node !== null) {
    yield* this.postOrderTraversal(node.left);
    yield* this.postOrderTraversal(node.right);
    yield `${node.data} `;
  }
};
Node.prototype.breadthFirstTraversal = function* (node, length, level) {
  if (node === null) return;
  if (level == 1) {
    let stringBuilder = "\n";
    for (let i = 0; i < length; i++) stringBuilder += " ";
    stringBuilder += "/ \\\n";
    for (
      let i = 0;
      i < length - `${node.left ? node.left.data : "null"}`.length - 1;
      i++
    )
      stringBuilder += "  ";
    stringBuilder += `${node.left ? node.left.data : "null"}   ${
      node.right ? node.right.data : "null"
    }`;
    yield stringBuilder;
  } else if (level > 1) {
    yield* this.breadthFirstTraversal(node.root.left, level - 1);
    yield* this.breadthFirstTraversal(node.right, level - 1);
  }
};
Node.prototype.printTree = function* (node, length, level) {
  if (this.root == null) return;
  if (level == 1) {
    let stringBuilder = "\n";
    for (let i = 0; i < length; i++) stringBuilder += " ";
    stringBuilder += "/ \\\n";
    for (
      let i = 0;
      i < length - `${node.left ? node.left.data : "null"}`.length - 1;
      i++
    )
      stringBuilder += "  ";
    stringBuilder += `${node.left ? node.left.data : "null"}   ${
      node.right ? node.right.data : "null"
    }`;
    yield stringBuilder;
  } else if (level > 1) {
    yield* this.printTree(node.left, length - 1, level - 1);
    yield* this.printTree(node.right, length - 1, level - 1);
  }
};

const printBST = (testCase) => {
  const bst = new Tree(),
    order = testCase.pop();
  testCase.forEach((element) => bst.insert(element));
  return bst.print(order, testCase.length);
};

testingUtils.runTestsTo(printBST, testCases);

module.exports = exports = { Tree, Node };
