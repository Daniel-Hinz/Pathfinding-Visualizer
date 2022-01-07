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
        this.state = {
            algorithm: '',
            nodes: [],
            speed: 0,
            start: [],
            end: [],
        }
    }

    componentDidMount() {
        let grid = [];
        for (let row = 0; row < 13; ++row) {
            let nodeRow = [];
            for (let col = 0; col < 13; ++col) {
                nodeRow.push({
                    type: row === 6 && col === 3 ? 'start' : row === 6 && col === 9 ? 'end' : '',
                    col: col,
                    row: row
                })
            }
            grid.push(nodeRow);
        }
        this.setState({nodes: grid, start: grid[6][3], end: grid[6][9]});
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

                <main>
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
                                case 'A*':        AStar(this);        break;
                                case 'Breadth':   BreadthFirst(this, this.state.start, this.state.end); break;
                                case 'Depth':     DepthFirst(this);   break;
                                case 'Dijkstras': Dijkstras(this);    break;
                                case 'Swarm':     Swarm(this);        break;
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