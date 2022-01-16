export default function division(component, grid, row, col, old) {

    // get orientation of the line to be drawn
    let orientation = '';
    if (grid[0].length < grid.length)
        orientation = 'horz';
    else if (grid.length < grid[0].length) 
        orientation = 'vert';
    else 
        orientation = Math.floor(Math.random() * 2) === 1 ? 'horz' : 'vert';

    // if line to be drawn is horizontal
    if (orientation === 'horz') {

        // get location to split
        let split = old;
        while (old === split) {
            split = (Math.floor(Math.random() * (grid.length-2)))+1;
            
            if (grid.length < 4)
                break;
        }

        // get gap node
        let gap =  Math.floor(Math.random() * grid[0].length);

        // draw the line from starting col
        for (let i = col; i < col + grid[0].length; ++i) {
            if (gap + col === i || component.state.nodes[split+row][i].type !== '')
                continue;
        
            component.setNode(component.state.nodes[split + row][0].row, i, 'type', 'barrier', 'visited', true);
        }

        // get above grid
        let above = [];
        for (let i = 0; i < split; ++i) {
            let row = [];
            for (let j = 0; j < grid[0].length; ++j) 
                row.push(component.state.nodes[grid[i][j].row][grid[i][j].col]);
            above.push(row);
        }

        // get below grid
        let below = [];
        for (let i = split + 1; i < grid.length; ++i) {
            let row = [];
            for (let j = 0; j < grid[0].length; ++j) 
                row.push(component.state.nodes[grid[i][j].row][grid[i][j].col]);
            below.push(row);
        }

        // recursively call the function
        if (above.length > 1 && above[0].length > 1)
            division(component, above, above[0][0].row, above[0][0].col, gap);

        if (below.length > 1 && below[0].length > 1)
            division(component, below, below[0][0].row, below[0][0].col, gap);
    
    // if line to be drawn is vertical
    } else {

        // get split location
        let split = old;
        while (old === split) {
            split = (Math.floor(Math.random() * (grid[0].length-2)))+1;

            if (grid[0].length < 4)
                break;
        }

        // get gap node
        let gap = Math.floor(Math.random() * grid.length);

        // draw line from start row
        for (let i = row; i < row + grid.length; ++i) {
            if (gap + row === i || component.state.nodes[i][split+col].type !== '')
                continue;
        
            component.setNode(i, component.state.nodes[0][split + col].col, 'type', 'barrier', 'visited', true);
        }

        // get left grid
        let left = [];
        for (let i = 0; i < grid.length; ++i) {
            let row = [];
            for (let j = 0; j < split; ++j) 
                row.push(component.state.nodes[grid[i][j].row][grid[i][j].col]);
            left.push(row);
        }

        // get right grid
        let right = [];
        for (let i = 0; i < grid.length; ++i) {
            let row = [];
            for (let j = split+1; j < grid[0].length; ++j) 
                row.push(component.state.nodes[grid[i][j].row][grid[i][j].col]);
            right.push(row);
        }

        // recursively call the function
        if (left.length > 1 && left[0].length > 1)
            division(component, left, left[0][0].row, left[0][0].col, gap);
    
        if (right.length > 1 && right[0].length > 1)
            division(component, right, right[0][0].row, right[0][0].col, gap);
    }
}