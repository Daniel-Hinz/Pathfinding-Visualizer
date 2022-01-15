export default function randomMaze(component) {
    let grid = component.state.nodes;

    for(let row = 0; row < grid.length; ++row) {
        for (let col = 0; col < grid[0].length; ++col) {

            if (grid[row][col].type !== '')
                continue;

            if(Math.floor(Math.random() * 3) === 1) 
                component.setNode(row, col, 'type', 'barrier', 'visited', true);
        }
    }
}