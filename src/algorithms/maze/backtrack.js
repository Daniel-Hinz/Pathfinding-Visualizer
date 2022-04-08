import { getBacktrackNeighbor, getBarrier } from "../helper";

const backtrack = (current, nodes, setNode) => {
  // initalize update current node unless start/end node
  let grid = nodes;
  if (current.type === "start" || current.type === "end")
    setNode(
      current.row,
      current.col,
      "type",
      current.type.toString(),
      "visited",
      true
    );
  else setNode(current.row, current.col, "type", "", "visited", true);

  // get neighbor
  let neighbor = getBacktrackNeighbor(grid, current);
  if (neighbor) {
    // remove barrier between neighbor unless start/end node
    let barrier = getBarrier(
      grid,
      current.row,
      current.col,
      neighbor.row,
      neighbor.col
    );
    if (barrier.type === "start" || barrier.type === "end")
      setNode(
        barrier.row,
        barrier.col,
        "type",
        barrier.type.toString(),
        "visited",
        true
      );
    else setNode(barrier.row, barrier.col, "type", "", "visited", true);

    // recursively call backtrack
    backtrack(neighbor, nodes, setNode);
    backtrack(neighbor, nodes, setNode);
  }
};

export default backtrack;
