export default function DepthFirst(component, start, end) {

    // initialize search
    let grid = component.state.nodes;
    let queue = [];
    let count = 0;
    queue.push(start);

    // while queue is not empty
    while (queue.length > 0) {

        // get first element
        let current = queue.shift();

        // update graph
        setTimeout(() => {
            component.setNode(current.row, current.col, 'type', 'visited', 'visited', true);
        }, 25 * count++);

        // check if you are at destination
        if (current.col === end.col && current.row === end.row) 
            return console.log('worked');

        // if not visited mark as visited
        if (grid[current.row][current.col].visited !== true) {
            grid[current.row][current.col].visited = true;

            // get neighbors and add to queue
            let neighbors = getNeighbors(grid, current);
            console.log(neighbors);
            for (let i = 0; i < neighbors.length; ++i) {
                if (grid[neighbors[i].row][neighbors[i].col].visited !== true)
                    queue.unshift(grid[neighbors[i].row][neighbors[i].col]);
            }
        }
    }
}   

function getNeighbors(grid, node) {
    let neighbors = [];

    if (node.row > 0)
        neighbors.push(grid[node.row-1][node.col]);

    if (node.col+1 < grid[0].length)
        neighbors.push(grid[node.row][node.col+1]);

    if (node.row+1 < grid.length)
        neighbors.push(grid[node.row+1][node.col]);

    if (node.col > 0)
        neighbors.push(grid[node.row][node.col-1]);
        
    return neighbors;
}