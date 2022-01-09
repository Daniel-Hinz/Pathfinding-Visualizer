import React from 'react';

class Node extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            visited: props.visited,
            draggableElement: '',
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
                    <div className='start node' type='start'>
                        <i  className="start fas fa-chevron-right" 
                            draggable={true} 
                            onDragStart={(e) => {e.dataTransfer.setData('type', this.props.type)}}
                            onDrag={() => {this.setState({type: ''})}}>
                        </i>
                    </div>
                );
            
            // End Node Element
            case 'end':     
                return (
                    <div className='end node' type='end'>
                        <i  className="end far fa-dot-circle" 
                            draggable={true} 
                            onDragStart={(e) => {e.dataTransfer.setData('type', this.props.type)}}
                            onDrag={() => {this.setState({type: ''})}}> 
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
                     onDrop ={(e) => {this.setState({type: e.dataTransfer.getData('type')})}}>
                </div>
            );
        }
    }
}

export default Node;