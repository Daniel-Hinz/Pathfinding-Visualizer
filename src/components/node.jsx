import React from 'react';

class Node extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            mouse: props.mouse,
            type: props.type,
            x: props.x,
            y: props.y
        }
    }

    render() {
        switch(this.state.type) { 
            case 'start':   return (<div className='node'><i draggable={true} className="start-node fas fa-chevron-right"></i></div>);
            case 'end':     return (<div className='node'><i draggable={true} className="end-node far fa-dot-circle"></i></div>); 
            case 'barrier': return (<div className='node'><i className="barrier-node fas fa-times" onClick={() => {this.setState({type: ''})}}></i></div>); 
            default:        return (<div className='node' onMouseEnter={(e) => {if (e.buttons === 1) this.setState({type: 'barrier'})}}></div>);
        }
    }
}

export default Node;