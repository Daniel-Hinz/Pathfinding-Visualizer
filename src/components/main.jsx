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
            mouse: false,
            nodes: [],
            speed: 0,
        }
    }

    componentDidMount() {
        let nodeRow = [];

        for (let row = 0; row < 13; ++row) {
            for (let col = 0; col < 13; ++col) {
                nodeRow.push({
                    type: 
                        col === 6 && row === 3 ? 'start' : 
                        col === 6 && row === 9 ? 'end' : '',
                    x: row,
                    y: col
                })
            }
            this.state.nodes.push(nodeRow);
            nodeRow = [];
        }

        this.forceUpdate();
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
                                    <Node x={dict.x} y={dict.y} type={dict.type} key={j}></Node>
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
                                case 'Breadth':   BreadthFirst(this); break;
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