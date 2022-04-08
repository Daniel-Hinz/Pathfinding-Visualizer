export const getNeighbors = (grid, node) => {
  let neighbors = [];

  if (node.row > 0 && grid[node.row - 1][node.col].visited === false)
    neighbors.push(grid[node.row - 1][node.col]);

  if (node.col > 0 && grid[node.row][node.col - 1].visited === false)
    neighbors.push(grid[node.row][node.col - 1]);

  if (
    node.row + 1 < grid.length &&
    grid[node.row + 1][node.col].visited === false
  )
    neighbors.push(grid[node.row + 1][node.col]);

  if (
    node.col + 1 < grid[0].length &&
    grid[node.row][node.col + 1].visited === false
  )
    neighbors.push(grid[node.row][node.col + 1]);

  return neighbors;
};

export const getBacktrackNeighbor = (grid, node) => {
  let neighbors = [];

  if (node.row > 0 && grid[node.row - 2][node.col].visited !== true)
    neighbors.push(grid[node.row - 2][node.col]);

  if (
    node.col + 2 < grid[0].length &&
    grid[node.row][node.col + 2].visited !== true
  )
    neighbors.push(grid[node.row][node.col + 2]);

  if (
    node.row + 2 < grid.length &&
    grid[node.row + 2][node.col].visited !== true
  )
    neighbors.push(grid[node.row + 2][node.col]);

  if (node.col > 0 && grid[node.row][node.col - 2].visited !== true)
    neighbors.push(grid[node.row][node.col - 2]);

  return neighbors[Math.floor(Math.random() * neighbors.length)];
};

export const getDistance = (a, b) => {
  return Math.hypot(a.row - b.row, a.col - b.col);
};

export const getBarrier = (grid, row1, col1, row2, col2) => {
  if (row1 === row2)
    return col1 > col2 ? grid[row1][col2 + 1] : grid[row1][col1 + 1];

  if (col1 === col2)
    return row1 < row2 ? grid[row1 + 1][col1] : grid[row2 + 1][col1];
};
