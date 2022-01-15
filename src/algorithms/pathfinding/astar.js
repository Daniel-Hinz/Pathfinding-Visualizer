// function to perform astar algorithm
function AStar(component, start, end) {

    // initialize variables
    let open     = [];
    let camefrom = [];
    let count    = 0;

    // set node values
    component.setGrid('fscore', 1000);
    component.setGrid('gscore', 1000);

    // initalize search
    component.setNode(start.row, start.col, 'fscore', getDistance(start, end));
    component.setNode(start.row, start.col, 'gscore', 0);
    open.push(component.state.nodes[start.row][start.col]);

    // start search
    while (open.length > 0) {

        // sort elements by fscore (asc)
        open.sort(function(first, second) {
            return first.fscore - second.fscore;
        });

        // traverse to it and remove from queue
        let current = open.shift();
        setTimeout(() => {
            component.setNode(current.row, current.col, 'type', 'visited', 'visited', true);
        }, 25 * count++);

        // return if at destination
        if (current.row === end.row && current.col === end.col) 
            return console.log('reached');

        // get neighbors
        let neighbors = getNeighbors(component.state.nodes, current);
        for (let i = 0; i < neighbors.length; ++i) {

            // get gscore for neighbors
            let tent_gscore = current.gscore + 1;

            // traverse to neighbor with lowest fscore
            if (tent_gscore < neighbors[i].gscore) {

                neighbors[i].gscore = tent_gscore;
                neighbors[i].fscore = tent_gscore + getDistance(neighbors[i], end)

                // add neighbor to queue
                if (!open.includes(neighbors[i]))
                    open.push(neighbors[i]);
            }
        }
    }
}   

// function to get neighbors for each element
function getNeighbors(grid, node) {
    let neighbors = [];

    if (node.row - 1 > 0 && grid[node.row-1][node.col].visited === false)
        neighbors.push(grid[node.row-1][node.col]);

    if (node.col - 1 > 0 && grid[node.row][node.col-1].visited === false)
        neighbors.push(grid[node.row][node.col-1]);

    if (node.row + 1 < grid.length && grid[node.row+1][node.col].visited === false)
        neighbors.push(grid[node.row+1][node.col]);

    if (node.col + 1 < grid[0].length && grid[node.row][node.col+1].visited === false)
        neighbors.push(grid[node.row][node.col+1]);

    return neighbors;
}

// returns distance between two elements
function getDistance(a, b) {
    return Math.hypot(a.row - b.row, a.col - b.col);
}

// builds best path 
function reconstruct(end) {

}

export default AStar;
