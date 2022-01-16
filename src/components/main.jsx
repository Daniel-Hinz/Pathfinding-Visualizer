import React from 'react';

// import components
import Node from '../components/node.jsx';

// import algorithms 
import AStar from '../algorithms/pathfinding/astar.js';
import BreadthFirst from '../algorithms/pathfinding/breadth-first.js';
import DepthFirst from '../algorithms/pathfinding/depth-first.js'
import Dijkstras from '../algorithms/pathfinding/dijkstras.js'
import Swarm from '../algorithms/pathfinding/swarm.js'

// import maze algorithms
import backtrack from '../algorithms/maze/backtrack.js'
import randomMaze from '../algorithms/maze/random.js';
import division from '../algorithms/maze/division.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: '',
            nodes: [],
            maze: '',
            speed: 0,
            start: {},
            end: {}
        }

        this.generateGrid = this.generateGrid.bind(this);
        this.setGrid      = this.setGrid.bind(this);
        this.setNode      = this.setNode.bind(this);
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
        let numCols = ((Math.floor(main.offsetWidth / 30) - 2) % 2 === 1) ? (Math.floor(main.offsetWidth / 30) - 2) : (Math.floor(main.offsetWidth / 30) - 2) - 1;
        let numRows = ((Math.floor(main.offsetHeight / 30) - 2) % 2 === 1) ? (Math.floor(main.offsetHeight / 30) - 2) : (Math.floor(main.offsetHeight / 30) - 2) - 1;
        
        let grid = [];
        for (let row = 0; row < numRows; ++row) {
            let nodeRow = [];
            for (let col = 0; col < numCols; ++col) {
                nodeRow.push({
                    visited: false,
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

    // sets the entire grid to a paticular value
    setGrid(attr, value) {
        let grid = [...this.state.nodes];
        for (let row = 0; row < this.state.nodes.length; ++row) {
            for (let col = 0; col < this.state.nodes[0].length; ++col) {
                let node = {...grid[row][col]}

                if (attr === 'type' && (grid[row][col].type === 'start' || grid[row][col].type === 'end'))
                    continue;
                else if (attr === 'visited')
                    node[attr] = (node.type === 'barrier') ? true : false; 
                else 
                    node[attr] = value;

                grid[row][col] = node;
            }
        }
    
        this.setState({ nodes: grid });
    }

    // set a particular node to a certain value
    setNode(newRow, newCol, attr1, val1, attr2, val2) {
        let grid = [...this.state.nodes];
        for (let row = 0; row < this.state.nodes.length; ++row) {
            for (let col = 0; col < this.state.nodes[0].length; ++col) {
                if (row === newRow && col === newCol) {
                    let node = {...grid[row][col]}
                    node[attr1]    = val1;
                    node[attr2]    = val2;
                    grid[row][col] = node;
                }
            }
        }

        this.setState({
            start: (val1 === 'start') ? grid[newRow][newCol] : this.state.start,
            end:   (val1 === 'end'  ) ? grid[newRow][newCol] : this.state.end,
            nodes: grid 
        });
    }

    // render method
    render() {
        return (
            <div className='Main'>
                <header>
                    <h1>Pathfinding Visualizer</h1>

                    <div className='algorithm select'>
                        <select onChange={(e) => { 
                            this.setState({algorithm: e.target.value})
                        }}> 
                            <option value=''>Algorithm</option>
                            <option value='Dijkstras'>Dijkstras</option>
                            <option value='A*'>A* Search</option>    
                            <option value='Breadth'>Breadth First</option>                       
                            <option value='Depth'>Depth First</option>      
                        </select> 

                        <i className="fas fa-chevron-down"></i>
                    </div>

                    <div className='maze select'>
                        <select onChange={(e) => { 
                            switch(e.target.value) {
                                case 'Backtrack': this.setGrid('type', 'barrier'); backtrack (this, this.state.nodes[0][0]); break;
                                case 'Division':  this.setGrid('type', '');        division  (this, this.state.nodes,0,0,0); break;
                                case 'Random':    this.setGrid('type', '');        randomMaze(this, this.state.nodes);       break;
                            }
                            this.setGrid('visited', true);
                        }}> 
                            <option value=''>Maze</option>
                            <option value='Backtrack'>Backtracking</option>
                            <option value='Division'>Division</option>   
                            <option value='Random'>Random</option>                  
                        </select> 

                        <i className="fas fa-chevron-down"></i>
                    </div>
                </header>

                <main className='main'>
                    <div className='grid'> {
                        this.state.nodes.map((nodeRow, i) => 
                            <div className='node-row' key={i}> {
                                nodeRow.map((node, j) => 
                                    <Node setNode = {(row,col,type,val) => this.setNode(row,col,type,val)}
                                          row     = {node.row} 
                                          col     = {node.col} 
                                          type    = {node.type} 
                                          visited = {node.visited}  
                                          key     = {j}>        
                                    </Node>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                <footer>
                    <div className='control-panel'>
                        <input type="button" value='Search' onClick={() => {
                            switch(this.state.algorithm) {
                                case 'A*'       : AStar       (this, this.state.start, this.state.end); break;
                                case 'Breadth'  : BreadthFirst(this, this.state.start, this.state.end); break;
                                case 'Depth'    : DepthFirst  (this, this.state.start, this.state.end); break;
                                case 'Dijkstras': Dijkstras   (this, this.state.start, this.state.end); break;
                                case 'Swarm'    : Swarm       (this, this.state.start, this.state.end); break;
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