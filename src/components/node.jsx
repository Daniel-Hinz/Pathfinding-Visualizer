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
        };
    }

    render() {
        switch(this.state.type) { 

            // Start Node Element
            case 'start':   
                return (
                    <div className='start node'>
                        <i  className="start fas fa-chevron-right" 
                            draggable={true} 
                            onDrag={() => {this.setState({type: ''});}
                            }>
                        </i>
                    </div>
                );
            
            // End Node Element
            case 'end':     
                return (
                    <div className='end node'>
                        <i  className="end far fa-dot-circle" 
                            draggable={true} 
                            onDrag={() => {
                                this.setState({type: ''})
                            }}> 
                        </i>
                    </div>
                ); 
            
            // Barrier Node Element
            case 'barrier': 
                return (
                    <div className='barrier node' 
                         onClick={() => {this.setState({type: ''})}}>
                    </div>
                ); 
            
            // Visited Node Element
            case 'visited': 
                return (
                    <div className='node'></div>
                ); 

            // Default Node Element
            default: return (
                <div className='node' 
                     onMouseEnter={(e) => {if (e.buttons === 1) this.setState({type: 'barrier'})}}
                     onClick={() => {this.setState({type: 'barrier'})}}
                     onDragOver={(e) => {e.preventDefault()}}
                     onDrop ={(e) => {this.setState({type: 'start'})}}>
                </div>
            );
        }
    }
}

export default Node;