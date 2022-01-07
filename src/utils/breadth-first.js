export default function BreadthFirst(component, start, end) {
    let grid = component.state.nodes;
    let queue = [];

    grid[start.col][start.row].visited = true;
    queue.push(start);

    while(queue.length > 0) {
        let current = queue.shift();

        if (current.col === end.col && current.row === end.row)
            return;

        let neighbors = getNeighbors(grid, current);
        for (let i = 0; i < neighbors.length; ++i) {
            grid[neighbors[i].row][neighbors[i].col].visited = true;
            queue.push(neighbors[i]);
        }
    }
}

function getNeighbors(grid, node) {
    let neighbors = [];

    if (node.row-1 > 0 && grid[node.row-1][node.col].visited !== true)
        neighbors.push(grid[node.row-1][node.col]);

    if (node.row+1 < 13 && grid[node.row+1][node.col].visited !== true)
        neighbors.push(grid[node.row+1][node.col]);

    if (node.col-1 > 0 && grid[node.row][node.col-1].visited !== true)
        neighbors.push(grid[node.row][node.col-1]);

    if (node.col+1 < 13 && grid[node.row][node.col+1].visited !== true)
        neighbors.push(grid[node.row][node.col+1]);
    return neighbors;
}