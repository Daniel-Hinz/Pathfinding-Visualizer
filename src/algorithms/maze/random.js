const random = (grid, setNode) => {
  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[0].length; ++col) {
      if (grid[row][col].type !== "") continue;

      if (Math.floor(Math.random() * 3) === 1)
        setNode(row, col, "type", "barrier", "visited", true);
    }
  }
};

export default random;
