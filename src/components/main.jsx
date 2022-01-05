import React from 'react';
import Node from '../components/node.jsx'
import BreadthFirstSearch from '../utils/bfs.js'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: '',
            speed: 0,
            nodes: []
        }
    }

    componentDidMount() {
        let nodeRow = [];

        for (let row = 0; row < 18; ++row) {
            for (let col = 0; col < 13; ++col) {
                nodeRow.push({
                    start: col === 6 && row === 3 ? true : false,
                    end: col === 6 && row === 14 ? true : false,
                    x: col,
                    y: row
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
                    <h1>Pathfinding Visualizer</h1>

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
                                    <Node   x = {dict.x} y = {dict.y} 
                                            start = {dict.start} 
                                            end = {dict.end}
                                            key = {j}>        
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
                            BreadthFirstSearch(this);
                        }}/>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Main