export default function randomMaze(component) {
    let grid = component.state.nodes;
    let count = 0;

    for(let row = 0; row < grid.length; ++row) {
        for (let col = 0; col < grid[0].length; ++col) {

            if (grid[row][col].type !== '')
                continue;

            if( Math.floor(Math.random() * 4) === 1) {
                setTimeout(() => {
                    component.setNode(row, col, 'type', 'barrier', 'visited', true);
                }, 25 * count++);
            }
        }
    }
}