import React from 'react';

class Node extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            visited: props.visited,
            type: props.type,
            row: props.row,
            col: props.col,
            x: 0,
            y: 0
        }
    }

    render() {
        switch(this.state.type) { 
            case 'start':   return (<div className='node'><i className="start-node fas fa-chevron-right" draggable={true}></i></div>);
            case 'end':     return (<div className='node'><i className="end-node far fa-dot-circle"  draggable={true}></i></div>); 
            case 'barrier': return (<div className='node'><i className="barrier-node fas fa-times" onClick={() => {this.setState({type: ''})}}></i></div>); 
            case 'visited': return (<div className='node'><div className='visited'></div></div>); 

            default: return (
                <div className='node' 
                     onMouseEnter={(e) => {if (e.buttons === 1) this.setState({type: 'barrier'})}}
                     onClick={() => {this.setState({type: 'barrier'})}}>
                </div>
            );
        }
    }
}

export default Node;