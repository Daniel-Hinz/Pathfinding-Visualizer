import React from 'react';
import Node from '../components/node.jsx';
import AStar from '../algorithms/pathfinding/astar.js';
import BreadthFirst from '../algorithms/pathfinding/breadth-first.js';
import DepthFirst from '../algorithms/pathfinding/depth-first.js'
import Dijkstras from '../algorithms/pathfinding/dijkstras.js'
import Swarm from '../algorithms/pathfinding/swarm.js'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: '',
            speed: 0,
            type: '',
            nodes: [],
            start: {},
            end: {}
        }

        this.generateGrid = this.generateGrid.bind(this);
        this.updateNode = this.updateNode.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.generateGrid);
        this.generateGrid();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.generateGrid);
    }

    generateGrid() {
        let main = document.querySelector('.main');
        let numCols = Math.floor(main.offsetWidth / 30) - 2;
        let numRows = Math.floor(main.offsetHeight / 30) - 2;
        
        let grid = [];
        for (let row = 0; row < numRows; ++row) {
            let nodeRow = [];
            for (let col = 0; col < numCols; ++col) {
                nodeRow.push({
                    visited: false,
                    fn: 9999,
                    gn: 9999,
                    row: row,
                    col: col,
                    type: 
                        col === Math.floor((numCols)/4) && 
                        row === Math.floor(numRows/2) ? 'start' : 

                        col === Math.floor(numCols/1.33) && 
                        row === Math.floor(numRows/2) ? 'end' : ''
                })
            }
            grid.push(nodeRow);
        }

        this.setState({
            start: grid[Math.floor(numRows/2)][Math.floor(numCols/4)],
            end: grid[Math.floor(numRows/2)][Math.floor(numCols/1.33)],
            nodes: grid
        });
    }

    updateNode(newRow, newCol, value, visited) {

        let main = document.querySelector('.main');
        let numCols = Math.floor(main.offsetWidth / 30) - 2;
        let numRows = Math.floor(main.offsetHeight / 30) - 2;
        
        let grid = this.state.nodes;
        for (let row = 0; row < numRows; ++row) {
            for (let col = 0; col < numCols; ++col) {
                if (row === newRow && col === newCol)
                    grid[row][col] = {
                        visited: visited,
                        type: value,
                        weight: 1,
                        fn: 9999,
                        gn: 9999,
                        row: row,
                        col: col
                    }
            }
        }

        this.setState({
            start: (value === 'start') ? grid[newRow][newCol] : this.state.start,
            end: (value === 'end') ? grid[newRow][newCol] : this.state.end,
            nodes: grid 
        });
    }

    render() {
        return (
            <div className='Main'>
                <header>
                    <h1>Pathfinder</h1>

                    <select onChange={(e) => { 
                        this.setState({algorithm: e.target.value})
                    }}> 
                        <option value=''>Algorithm</option>
                        <option value='Dijkstras'>Dijkstras</option>
                        <option value='A*'>A*</option>   
                        <option value='Swarm'>Swarm</option>   
                        <option value='Breadth'>Breadth First</option>                       
                        <option value='Depth'>Depth First</option>                   
                    </select> 

                    <i className="fas fa-chevron-down"></i>
                </header>

                <main className='main'>
                    <div className='grid'> {
                        this.state.nodes.map((nodeRow, i) => 
                            <div className='node-row' key={i}> {
                                nodeRow.map((node, j) => 
                                    <Node updateNode={(row,col,val, visit) => this.updateNode(row,col,val,visit)}
                                          row={node.row} 
                                          col={node.col} 
                                          type={node.type} 
                                          visited={node.visited}  
                                          key={j}>        
                                    </Node>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                <footer>
                    <div className='control-panel'>
                        <p>Speed of the search:</p>
                        <input type="range" min='100' max='1000' step='50' defaultValue='550' onChange={(e) => {
                            this.setState({speed: e.target.value})
                        }}/>

                        <input type="button" value='Search' onClick={() => {
                            switch(this.state.algorithm) {
                                case 'A*':        AStar       (this, this.state.start, this.state.end); break;
                                case 'Breadth':   BreadthFirst(this, this.state.start, this.state.end); break;
                                case 'Depth':     DepthFirst  (this, this.state.start, this.state.end); break;
                                case 'Dijkstras': Dijkstras   (this, this.state.start, this.state.end); break;
                                case 'Swarm':     Swarm       (this, this.state.start, this.state.end); break;
                                default: alert('Please select an algorithm');
                            }
                        }}/>

                        <input type="button" value='Reset' onClick={() => { this.generateGrid() }}/>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Main