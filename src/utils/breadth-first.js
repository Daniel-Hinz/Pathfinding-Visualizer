export default function BreadthFirst(component, start, end) {
    let grid = component.state.nodes;
    let queue = [];

    grid[start.row][start.col].visited = true;
    queue.push(start);

    while(queue.length > 0) {
        let current = queue.shift();

        if (current.row === end.row && current.col === end.col)
            return console.log('worked');

        let neighbors = getNeighbors(grid, current);
        for (let i = 0; i < neighbors.length; ++i) {
            if (grid[neighbors[i].row][neighbors[i].col].visited !== true) {
                grid[neighbors[i].row][neighbors[i].col].visited = true;
                queue.push(neighbors[i]);
            }
        }
    }
}

function getNeighbors(grid, node) {
    let neighbors = [];

    if (node.row-1 > 0)
        neighbors.push(grid[node.row-1][node.col]);

    if (node.col+1 < 13)
        neighbors.push(grid[node.row][node.col+1]);

    if (node.row+1 < 13)
        neighbors.push(grid[node.row+1][node.col]);

    if (node.col-1 > 0)
        neighbors.push(grid[node.row][node.col-1]);
        
    return neighbors;
}