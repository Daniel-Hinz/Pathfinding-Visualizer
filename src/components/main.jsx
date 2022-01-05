import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: 0,
            speed: 0,
            nodes: Array.from({length: 459}, (_, i) => i + 1)
        }
    }
    
    search(component) {
        console.log(component.state.speed);
        return;
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
                    <div className='grid'>{
                        this.state.nodes.map((node, i) => 
                            <div className='node'
                                key={i}>
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
                            this.search(this);
                        }}/>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Main