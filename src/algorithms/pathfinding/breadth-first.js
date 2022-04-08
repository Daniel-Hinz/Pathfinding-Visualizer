import { getNeighbors } from "../helper";

const BreadthFirst = (start, end, nodes, setGrid, setNode) => {
  let grid = nodes;
  let queue = [];
  let count = 0;

  // instantiate grid
  setNode(start.row, start.col, "visited", true);
  queue.push(start);

  // start bfs
  while (queue.length > 0) {
    // get and update first element
    let current = queue.shift();

    // update graph
    setTimeout(() => {
      setNode(current.row, current.col, "type", "visited", "visited", true);
    }, 25 * count++);

    // return if at destination
    if (current.row === end.row && current.col === end.col) return;

    // get neighbors
    let neighbors = getNeighbors(grid, current);
    for (let i = 0; i < neighbors.length; ++i) {
      // mark visited locations and go to unvisited neighbors
      if (grid[neighbors[i].row][neighbors[i].col].visited !== true) {
        setNode(neighbors[i].row, neighbors[i].col, "visited", true);
        queue.push(neighbors[i]);
      }
    }
  }
};

export default BreadthFirst;
