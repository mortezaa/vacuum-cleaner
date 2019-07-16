import React, { Component } from 'react';
import vacuum from '../vacuum-cleaner.png';
import trash from '../trash.png';
class Field extends Component {
    constructor(){
        super();
        this.state = {
            clean : true,
        };

    }
    render() {
        return (
            <span className="board-feild">
                {(this.props.status !== 0)?<img className="trash" src={trash}/>:''}
                {(this.props.CleanerPosition == true)?<img className="vacuum" src={vacuum}/>:""}
                {/*{(this.props.CleanerPosition == true)?console.log(this.props.topField):""}*/}
            </span>
        );
    }
}

export default Field;