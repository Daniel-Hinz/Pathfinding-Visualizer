export default function DepthFirst(component, start, end) {
    let grid = component.state.nodes;
    let queue = [];

    queue.push(start);
    while (queue.length > 0) {
        let current = queue.shift();

        if (current.col === end.col && current.row === end.row) 
            return console.log('worked');

        if (grid[current.row][current.col].visited !== true) {
            grid[current.row][current.col].visited = true;

            let neighbors = getNeighbors(grid, current);
            for (let i = 0; i < neighbors.length; ++i) {
                if (grid[neighbors[i].row][neighbors[i].col].visited !== true)
                    queue.push(grid[neighbors[i].row][neighbors[i].col]);
            }
        }
    }
}   

function getNeighbors(grid, node) {
    let neighbors = [];

    if (node.row-1 > 0)
        neighbors.push(grid[node.row-1][node.col]);

    if (node.col+1 < grid[0].length)
        neighbors.push(grid[node.row][node.col+1]);

    if (node.row+1 < grid.length)
        neighbors.push(grid[node.row+1][node.col]);

    if (node.col-1 > 0)
        neighbors.push(grid[node.row][node.col-1]);
        
    return neighbors;
}