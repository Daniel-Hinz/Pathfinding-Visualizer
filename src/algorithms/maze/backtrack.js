export default function backtrack(component, current) {

    // initalize update current node
    let grid = component.state.nodes;
    component.updateNode(current.row, current.col, '', true);

    // get neighbors
    let neighbors = getNeighbors(grid, current);
    while(neighbors.length > 0) {
    
        // pick random neighbor
        let neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        neighbors.splice(neighbors[neighbor], 1);

        // remove barrier between neighbor
        let barrier = getBarrier(grid, current.row, current.col, neighbor.row, neighbor.col);
        component.updateNode(barrier.row, barrier.col, '', true);

        // recursively call backtrack
        backtrack(component, neighbor);
    }
} 

// gets barrier inbetween neighbor and current
function getBarrier(grid, row1, col1, row2, col2){
    if (row1 === row2)
        return (col1 > col2) ? grid[row1][col2+1] : grid[row1][col1+1];
    
    if (col1 === col2) 
        return (row1 < row2) ? grid[row1+1][col1] : grid[row2+1][col1];
}

// gets neighbors of current node
function getNeighbors(grid, node) {
    let neighbors = [];

    if (node.row > 0 && grid[node.row-2][node.col].visited !== true)
        neighbors.push(grid[node.row-2][node.col]);

    if (node.col+2 < grid[0].length && grid[node.row][node.col+2].visited !== true)
        neighbors.push(grid[node.row][node.col+2]);

    if (node.row+2 < grid.length && grid[node.row+2][node.col].visited !== true)
        neighbors.push(grid[node.row+2][node.col]);

    if (node.col > 0 && grid[node.row][node.col-2].visited !== true)
        neighbors.push(grid[node.row][node.col-2]);

    return neighbors;
}