function Dijkstras(component, start, end) {

    // initialize search
    let count = 0;
    let queue = [];

    // set all distances to infinity except for start node
    component.setGrid('dist', Number.MAX_VALUE);
    component.setGrid('prev', null);
    component.setNode(start.row, start.col, 'dist', 0);

    // add every element that isnt a barrier to the queue
    for (let i = 0; i < component.state.nodes.length; ++i) {
        for (let j = 0; j < component.state.nodes[0].length; ++j)
            if(component.state.nodes[i][j].type !== 'barrier')
                queue.push(component.state.nodes[i][j]);
    }

    // start search
    while (queue.length > 0) {
        
        // sort queue by distance (asc)
        queue.sort((first, second) => {
            return first.dist - second.dist;
        })

        // get element with lowest distance, update it, and remove it from queue
        let current = queue.shift();
        setTimeout(() => {
            component.setNode(current.row, current.col, 'type', 'visited', 'visited', true);
        }, 25 * count++);

        // return if at destination
        if (current.row === end.row && current.col === end.col) 
            return console.log("reached");

        // check each neighbor of current
        let neighbors = getNeighbors(component.state.nodes, current);
        for (let i = 0; i < neighbors.length; ++i) {

            // update distance of element with 
            let tent_dist = component.state.nodes[current.row][current.col].dist + getDistance(current, neighbors[i]);
            if (tent_dist < component.state.nodes[neighbors[i].row][neighbors[i].col].dist) {
                neighbors[i].dist = tent_dist;
                neighbors[i].prev = current;
            }
        }

    }
}   

// gets neighbors of a node
function getNeighbors(grid, node) {
    let neighbors = [];

    if (node.row > 0 && grid[node.row-1][node.col].visited === false)
        neighbors.push(grid[node.row-1][node.col]);

    if (node.col > 0 && grid[node.row][node.col-1].visited === false)
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

export default Dijkstras;