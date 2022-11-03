import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';
import Voting from './Voting';

class Confirmation extends Component {
    constructor(){
        super();
        this.state = {
            redirect:false
        }
    }

    confirmVote = ()=>{
        var user = sessionStorage.getItem('user')
        var candidate = sessionStorage.getItem('selected')

        this.props.users[user].voted = Number(candidate) 
        this.props.candidates[candidate].votes++;

       
        console.log(this.props.candidates)
        axios.post('/users',this.props.users)
        axios.post('/users/candidates',this.props.candidates)
        
        
        swal("Congratulation", "Your vote has been stored", "success").then(() => {window.location.reload()})
        
    }
    render() {
        if(this.state.redirect){
            return  <Voting users={this.props.users}/>
        }
       
        return (
            <div className='text-center'>
                <h1> You selected candidate </h1>
                <img src={this.props.candidates[sessionStorage.getItem('selected')].image} alt="not found"></img>
                <h4>{this.props.candidates[sessionStorage.getItem('selected')].name}</h4>
                <button className='btn btn-secondary mx-5' onClick={() => {this.setState({redirect:true})}}>Back</button>
                <button className='btn btn-primary' onClick={()=>this.confirmVote()}>Confirm</button>
            </div>
        );
    }
}

export default Confirmation;
