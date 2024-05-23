/**
 * Tree Node class representing each node in the search tree.
 */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

/**
 * Depth-First Search (DFS) algorithm for tree traversal.
 * @param {TreeNode} node - The root node of the tree.
 * @param {Function} callback - The function to call on each node's value.
 */
const depthFirstSearch = (node, callback) => {
  if (!node) return;
  callback(node.value);
  node.children.forEach(child => depthFirstSearch(child, callback));
};

/**
 * Breadth-First Search (BFS) algorithm for tree traversal.
 * @param {TreeNode} node - The root node of the tree.
 * @param {Function} callback - The function to call on each node's value.
 */
const breadthFirstSearch = (node, callback) => {
  const queue = [node];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    callback(currentNode.value);
    currentNode.children.forEach(child => queue.push(child));
  }
};

export { TreeNode, depthFirstSearch, breadthFirstSearch };