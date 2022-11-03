import React, { Component } from 'react';
import candidates from "./candidates.json"

class Voted extends Component {
   
    render() {
        return (
            <div className='text-center'>
                <h1> You have already voted candidate </h1>
                <img src={candidates[this.props.id].image} alt="not found"></img>
                <h4>{candidates[this.props.id].name}</h4>
            </div>
        );
    }
}

export default Voted;
