import React from 'react';

class Node extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            start: props.start,
            end: props.end,
            x: props.x,
            y: props.y
        }
    }

    render() {
        if (this.state.start === true) 
            return (
                <div className='node'>
                    <i className="start-node fas fa-arrow-right"></i>
                </div>
            )
        else if (this.state.end === true)
            return (
                <div className='node'>
                    <i className="end-node fas fa-bullseye"></i>
                </div>
            )
        else
            return (
                <div className='node'></div>
            )
    }
}

export default Node;