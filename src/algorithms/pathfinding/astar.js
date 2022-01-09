function AStar(component, start, end) {
    let grid = component.state.nodes;
    let open = [];

    // instantiate grid
    grid[start.row][start.col].fn = getDistance(start, end);
    grid[start.row][start.col].gn = 0;
    open.push(start);

    while (open.length > 0) {
    
        // get best value in open
        let current = open[0];
        for (let i = 0; i < open.length; ++i) 
            current = (open[i].fn < current.fn) ? open[i] : current;
        
        // reconstruct if end is reached
        if (current.row === end.row && current.col === end.row)
            return reconstruct(current);

        // remove current from open
        open.splice(open.indexOf(current), 1);
        for (const neighbor of getNeighbors(grid, current)) {
    
            // get weighted gn for each neighbor
            let tentative_gScore = current.gn + 1;

            // if weighted gn is lower than regular gn
            if (tentative_gScore < neighbor.gn){
                
                // update values
                neighbor.previous = current;
                neighbor.gn = tentative_gScore;
                neighbor.fn = tentative_gScore + getDistance(neighbor, end);

                // add to queue
                if (!open.includes(neighbor))
                    open.push(neighbor);
            }
        }
    }
}   

// function to get neighbors for each element
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

// returns distance between two elements
function getDistance(a, b) {
    return Math.abs(Math.hypot(a.row - b.row, a.col - b.col)); 
}

// builds best path 
function reconstruct(end) {
    let total_path = [];
    let current = end;

    while (current.previous) {
        total_path.unshift(current);
        current = current.previous;
    }
    
    return total_path;
}

export default AStar;
