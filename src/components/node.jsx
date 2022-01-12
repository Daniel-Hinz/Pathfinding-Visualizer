import React from 'react';

class Node extends React.Component { 
    render() {
        switch(this.props.type) { 

            // Start Node Element
            case 'start':   
                return (
                    <div    className =   {this.props.type + ' node'}>
                        <i  className =   {"start fas fa-chevron-right" }
                            draggable =   {true} 
                            onDragStart = {(e) => {e.dataTransfer.setData('type', this.props.type)}}
                            onDrag=       {() => {this.props.setNode(this.props.row, this.props.col, 'type', '')}}>
                        </i>
                    </div>
                );
            
            // End Node Element
            case 'end':     
                return (
                    <div    className   = {this.props.type + ' node'}>
                        <i  className   = {"end far fa-dot-circle"} 
                            draggable   = {true} 
                            onDragStart = {(e) => {e.dataTransfer.setData('type', this.props.type)}}
                            onDrag      = {()  => {this.props.setNode(this.props.row, this.props.col, 'type', '')}}>
                        </i>
                    </div>
                ); 
            
            // Barrier Node Element
            case 'barrier': 
                return (
                    <div className = {this.props.type + ' node'}
                         onClick   = {() => {this.props.setNode(this.props.row, this.props.col, 'type', '')}}>
                    </div>
                ); 

            case 'visited': 
                return (
                    <div className = {this.props.type + ' node'}>
                    </div>
                ); 

            // Default Node Element
            default: return (
                <div className    = {this.props.visited + ' ' + this.props.type + ' node'} 
                     onDragOver   = {(e) => {e.preventDefault()}}
                     onDrop       = {(e) => {
                            this.props.setNode(this.props.row, this.props.col, 'type', e.dataTransfer.getData('type'))
                        }}
                     onMouseEnter = {(e) => {if (e.buttons === 1) {
                            this.props.setNode(this.props.row, this.props.col, 'type', 'barrier');
                            this.props.setNode(this.props.row, this.props.col, 'visited', true);
                        }}}
                     onClick      = {()  => {
                            this.props.setNode(this.props.row, this.props.col, 'type', 'barrier');
                            this.props.setNode(this.props.row, this.props.col, 'visited', true);
                        }}>
                </div>
            );
        }
    }
}

export default Node;