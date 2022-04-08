import { getDistance, getNeighbors } from "../helper";

// function to perform astar algorithm
const AStar = (start, end, nodes, setGrid, setNode) => {
  // initialize variables
  let open = [];
  let count = 0;

  // set node values
  setGrid("fscore", Number.MAX_VALUE);
  setGrid("gscore", Number.MAX_VALUE);

  // initalize search
  setNode(start.row, start.col, "fscore", getDistance(start, end));
  setNode(start.row, start.col, "gscore", 0);
  open.push(nodes[start.row][start.col]);

  // start search
  while (open.length > 0) {
    // sort elements by fscore (asc)
    open.sort(function (first, second) {
      return first.fscore - second.fscore;
    });

    // traverse to it and remove from queue
    let current = open.shift();
    setTimeout(() => {
      setNode(current.row, current.col, "type", "visited", "visited", true);
    }, 25 * count++);

    // return if at destination
    if (current.row === end.row && current.col === end.col)
      return console.log("reached");

    // get neighbors
    let neighbors = getNeighbors(nodes, current);
    for (let i = 0; i < neighbors.length; ++i) {
      // get gscore for neighbors
      let tent_gscore = current.gscore + 1;

      // traverse to neighbor with lowest fscore
      if (tent_gscore < neighbors[i].gscore) {
        // update nodes
        neighbors[i].gscore = tent_gscore;
        neighbors[i].fscore = tent_gscore + getDistance(neighbors[i], end);

        // add neighbor to queue
        if (!open.includes(neighbors[i])) open.push(neighbors[i]);
      }
    }
  }
};

export default AStar;
