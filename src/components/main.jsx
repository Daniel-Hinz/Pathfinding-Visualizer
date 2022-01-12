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
import divison from '../algorithms/maze/division.js';

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
        this.setVisited = this.setVisited.bind(this);
        this.setGrid      = this.setGrid.bind(this);
        this.updateNode   = this.updateNode.bind(this);
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
    
    setVisited() {
        let grid = [...this.state.nodes];
        for(let i = 0; i < this.state.nodes.length; ++i) {
            for (let j = 0; j < this.state.nodes[0].length; ++j) {
                
                let node = {...grid[i][j]};
                node.visited = (node.type !== 'barrier') ? false : true; 
                grid[i][j] = node;
            }
        }

        this.setState({ nodes: grid })
    }

    setGrid(value) {
        let main = document.querySelector('.main');
        let numCols = Math.floor(main.offsetWidth / 30) - 2;
        let numRows = Math.floor(main.offsetHeight / 30) - 2;
        
        let grid = this.state.nodes;
        for (let row = 0; row < numRows; ++row) {
            for (let col = 0; col < numCols; ++col) {
                if (row === this.state.start.row && col === this.state.start.col)
                    continue;

                if (row === this.state.end.row && col === this.state.end.col)
                    continue;

                grid[row][col] = {
                    visited: false,
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
            nodes: grid
        });
    }

    updateNode(newRow, newCol, type, visited) {

        let main = document.querySelector('.main');
        let numCols = Math.floor(main.offsetWidth / 30) - 2;
        let numRows = Math.floor(main.offsetHeight / 30) - 2;
        
        let grid = this.state.nodes;
        for (let row = 0; row < numRows; ++row) {
            for (let col = 0; col < numCols; ++col) {
                if (row === newRow && col === newCol)
                    grid[row][col] = {
                        visited: visited,
                        type: type,
                        weight: 1,
                        fn: 9999,
                        gn: 9999,
                        row: row,
                        col: col
                    }
            }
        }

        this.setState({
            start: (type === 'start') ? grid[newRow][newCol] : this.state.start,
            end: (type === 'end') ? grid[newRow][newCol] : this.state.end,
            nodes: grid 
        });
    }

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
                            <option value='A*'>A*</option>   
                            <option value='Swarm'>Swarm</option>   
                            <option value='Breadth'>Breadth First</option>                       
                            <option value='Depth'>Depth First</option>      
                        </select> 

                        <i className="fas fa-chevron-down"></i>
                    </div>

                    <div className='maze select'>
                        <select onChange={(e) => { 
                            switch(e.target.value) {
                                case 'Backtrack': this.setGrid('barrier'); backtrack(this, this.state.nodes[0][0]); this.setVisited(); break;
                                case 'Division':  this.setGrid(''); divison(this); break;
                                case 'Random':    this.setGrid(''); randomMaze(this); break;
                                default: ;
                            }
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