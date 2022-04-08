import { getNeighbors, getDistance } from "../helper";

const Dijkstras = (start, end, nodes, setGrid, setNode) => {
  // initialize search
  let count = 0;
  let queue = [];

  // set all distances to infinity except for start node
  setGrid("dist", Number.MAX_VALUE);
  setGrid("prev", null);
  setNode(start.row, start.col, "dist", 0);

  // add every element that isnt a barrier to the queue
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[0].length; ++j)
      if (nodes[i][j].type !== "barrier") queue.push(nodes[i][j]);
  }

  // start search
  while (queue.length > 0) {
    // sort queue by distance (asc)
    queue.sort((first, second) => {
      return first.dist - second.dist;
    });

    // get element with lowest distance and remove it from queue
    let current = queue.shift();

    // return if at destination trapped
    if (current.dist === Number.MAX_VALUE) return console.log("trapped");

    // update node
    setTimeout(() => {
      setNode(current.row, current.col, "type", "visited", "visited", true);
    }, 25 * count++);

    // return if node is at destination
    if (current.row === end.row && current.col === end.col)
      return console.log("reached");

    // get neighbors of current, return if none
    let neighbors = getNeighbors(nodes, current);

    // evaluate each neighbors
    for (let i = 0; i < neighbors.length; ++i) {
      // update distance of element with
      let tent_dist =
        nodes[current.row][current.col].dist +
        getDistance(current, neighbors[i]);
      if (tent_dist < nodes[neighbors[i].row][neighbors[i].col].dist) {
        neighbors[i].dist = tent_dist;
        neighbors[i].prev = current;
      }
    }
  }
};

export default Dijkstras;
