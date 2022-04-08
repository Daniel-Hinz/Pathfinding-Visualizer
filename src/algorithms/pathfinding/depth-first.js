import { getNeighbors } from "../helper";

const DepthFirst = (start, end, nodes, setGrid, setNode) => {
  // initialize search
  let grid = nodes;
  let queue = [];
  let count = 0;
  queue.push(start);

  // while queue is not empty
  while (queue.length > 0) {
    // get first element
    let current = queue.shift();

    // update graph
    setTimeout(() => {
      setNode(current.row, current.col, "type", "visited", "visited", true);
    }, 25 * count++);

    // check if you are at destination
    if (current.col === end.col && current.row === end.row) return;

    // if not visited mark as visited
    if (grid[current.row][current.col].visited !== true) {
      grid[current.row][current.col].visited = true;

      // get neighbors and add to queue
      let neighbors = getNeighbors(grid, current);
      for (let i = 0; i < neighbors.length; ++i) {
        if (grid[neighbors[i].row][neighbors[i].col].visited !== true)
          queue.unshift(grid[neighbors[i].row][neighbors[i].col]);
      }
    }
  }
};

export default DepthFirst;
