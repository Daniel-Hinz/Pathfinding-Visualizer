export default function BreadthFirst(grid, start, end) {
    let visited = [];
    let queue = [];

    visited.push(start);
    queue.push(start);
    while(queue.length > 0) {
        let current = queue.shift();

        if (current.x === end.x && current.y === end.y) {
            console.log("it worked")
            return;
        }

        let neighbors = getNeighbors(current, visited);
        console.log(neighbors);
        // for (let i = 0; i < neighbors.length; ++i) {
        //     visited.push(neighbors[i]);
        //     queue.push(neighbors[i]);
        // }
    }

    console.log('not infinite');
}

function getNeighbors(node, visited) {
    let neighbors = [];

    if (node.x-1 > 0 && !visited.includes({x: node.x-1, y: node.y}))
        neighbors.push({x: node.x-1, y: node.y});

    if (node.x+1 < 13 && !visited.includes({x: node.x+1, y: node.y}))
        neighbors.push({x: node.x+1, y: node.y})

    if (node.y-1 > 0 && !visited.includes({x: node.x, y: node.y-1}))
        neighbors.push({x: node.x, y: node.y-1})

    if (node.y+1 < 13 && !visited.includes({x: node.x, y: node.y+1}))
        neighbors.push({x: node.x, y: node.y+1})

    return neighbors;
}