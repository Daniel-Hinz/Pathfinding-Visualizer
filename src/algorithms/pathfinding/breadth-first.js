export default function BreadthFirst(component, start, end) {
    let grid = component.state.nodes;
    let queue = [];
    let count = 0;

    // instantiate grid
    component.setNode(start.row, start.col, 'visited', true);
    queue.push(start);

    // start bfs
    while(queue.length > 0) {

        // get and update first element
        let current = queue.shift();

        // update graph
        setTimeout(() => {
            component.setNode(current.row, current.col, 'type', 'visited', 'visited', true);
        }, 25 * count++);
  
        // return if at destination
        if (current.row === end.row && current.col === end.col)
            return console.log('worked');

        // get neighbors
        let neighbors = getNeighbors(grid, current);
        for (let i = 0; i < neighbors.length; ++i) {

            // mark visited locations and go to unvisited neighbors
            if (grid[neighbors[i].row][neighbors[i].col].visited !== true) {
                component.setNode(neighbors[i].row, neighbors[i].col, 'visited', true);
                queue.push(neighbors[i]);
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