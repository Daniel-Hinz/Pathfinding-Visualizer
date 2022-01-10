import React from 'react';

class Node extends React.Component { 
    render() {
        switch(this.props.type) { 

            // Start Node Element
            case 'start':   
                return (
                    <div className={'start node'} type={this.props.type}>
                        <i  className="start fas fa-chevron-right" 
                            draggable={true} 
                            onDragStart={(e) => {e.dataTransfer.setData('type', this.props.type)}}
                            onDrag={() => {this.props.updateNode(this.props.row, this.props.col, '', false)}}>
                        </i>
                    </div>
                );
            
            // End Node Element
            case 'end':     
                return (
                    <div className={'end node'} type={this.props.type}>
                        <i  className="end far fa-dot-circle" 
                            draggable={true} 
                            onDragStart={(e) => {e.dataTransfer.setData('type', this.props.type)}}
                            onDrag={() => {this.props.updateNode(this.props.row, this.props.col, '', false)}}> 
                        </i>
                    </div>
                ); 
            
            // Barrier Node Element
            case 'barrier': 
                return (
                    <div className='barrier node' type={this.props.type}
                         onClick={() => {this.props.updateNode(this.props.row, this.props.col, '', true)}}>
                    </div>
                ); 

            case 'visited': 
                return (
                    <div className='visited node' type={this.props.type}>

                    </div>
                ); 

            // Default Node Element
            default: return (
                <div className={'node'} type={this.props.type} 
                     onMouseEnter={(e) => {if (e.buttons === 1) this.props.updateNode(this.props.row, this.props.col, 'barrier', true)}}
                     onClick={() => {this.props.updateNode(this.props.row, this.props.col, 'barrier', true)}}
                     onDragOver={(e) => {e.preventDefault()}}
                     onDrop ={(e) => {this.props.updateNode(this.props.row, this.props.col, e.dataTransfer.getData('type'), false)}}>
                </div>
            );
        }
    }
}

export default Node;