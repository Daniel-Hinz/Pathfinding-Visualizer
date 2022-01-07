import React from 'react';
import Node from '../components/node.jsx';
import AStar from '../utils/a-star.js';
import BreadthFirst from '../utils/breadth-first.js';
import DepthFirst from '../utils/depth-first.js'
import Dijkstras from '../utils/dijkstras.js'
import Swarm from '../utils/swarm.js'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.numCols = 0;
        this.numRows = 0;
        this.state = {
            algorithm: '',
            nodes: [],
            speed: 0,
            start: [],
            end: []
        }

        this.generateGrid = this.generateGrid.bind(this);
    }

    generateGrid() {
        let main = document.querySelector('.main');
        this.numCols = Math.floor(main.offsetWidth / 30) - 2;
        this.numRows = Math.floor(main.offsetHeight / 30) - 2;
        
        let grid = [];
        for (let row = 0; row < this.numRows; ++row) {
            let nodeRow = [];
            for (let col = 0; col < this.numCols; ++col) {
                nodeRow.push({
                    type: 
                    col === Math.floor(this.numCols/4) && 
                    row === Math.floor(this.numRows/2) ? 'start' : 

                    col === Math.floor(this.numCols/1.33) && 
                    row === Math.floor(this.numRows/2) ? 'end' : '',
                    
                    row: row,
                    col: col
                })
            }
            grid.push(nodeRow);
        }

        this.setState({
            start: grid[Math.floor(this.numRows/2)][Math.floor(this.numCols/4)], 
            end: grid[Math.floor(this.numRows/2)][Math.floor(this.numCols/1.33)],
            nodes: grid
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.generateGrid);
        this.generateGrid();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.generateGrid);
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
                                nodeRow.map((dict, j) => 
                                    <Node row={dict.row} col={dict.col} type={dict.type} visited={false} key={j}></Node>
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
                    </div>
                </footer>
            </div>
        )
    }
}

export default Main