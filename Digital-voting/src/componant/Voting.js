import React, {Component} from 'react';
import Voted from './Voted';
import axios from 'axios';
import Confirmation from './Confirmation';


class Voting extends Component {

    constructor(){
        super();
        this.state = {
            selected:-1,
            redirect:false,
            voted:-1,
            candidates:[],
            loaded:false 
        }
    }

    componentDidMount(){
        var ind = sessionStorage.getItem('user')
        
        this.setState({
            voted : this.props.users[ind].voted
        })
        
        axios.get('./users/candidates').then(res => {
            console.log(res.data)
            this.setState({
                candidates : res.data,
                loaded:true
            })
        })
    }
    vote = ()=>{
       
        if(this.state.selected === -1){
            document.getElementById('votingError').innerText = "Please select a candidate."
            return;
        }
        this.setState({
            redirect:true
        })
        console.log(this.state.selected)
        sessionStorage.setItem('selected', this.state.selected)
    }
    update = (t)=>{
        this.setState({
            selected : t
        })
    }
    render() {
       
        if(this.state.loaded === false){
            return <h1 className='text-center'>Loading...</h1>
        }
        if(this.state.voted !== -1){
            return <Voted id={this.state.voted} candidates={this.props.candidates}/>
        }
        if(this.state.redirect)
            return  <Confirmation candidates={this.state.candidates} users={this.props.users}/>
        return (

            <div>
                <h1 className='text-center my-3'>Candidates List</h1>
                <hr/>

                <fieldset id="candidateSelect">
                    {this.state.candidates.map((c, id) => {
                        return <div key={id} className="col-10 d-flex flex-row justify-content-center align-items-center my-3 mx-auto ">
                            <input type="radio" value={id} name="candidate" id={"option"+id}/>

                            <label htmlFor={"option"+id} onClick={() => this.update(id)}>
                                <div className='d-flex flex-row justify-content-start align-items-center'>
                                    <img src={c.image} alt="Not Found" className='mx-3'/>
                                    <h3 className='mr-4'>{c.name}</h3>
                                </div>
                            </label>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#details"+id}>
                                Details
                            </button>
                            

                            
                            <div className="modal fade" id={"details" + id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Candidate Details</h5>
                                    <button type="button" classname="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div classname="container modal-body">
                                    <div className='d-flex flex-column justify-content-around p-5'>
                                         <img id="profile" src={c.image} alt="Not Found" className='mx-auto my-2'/>
                                         
                                            <div className='text-center'>
                                                <h4><strong>Name</strong></h4>
                                                <h5 className='mb-3'>{c.name}</h5>
                        
                                                <h4><strong>Phone</strong> </h4>
                                                <h4 className='mb-3'>{c.Phone}</h4>
                                            
                                                <h4><strong>Description</strong></h4>
                                                <h4>{c.description}</h4>
                                            </div>
                                        
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    })}
                    </fieldset>

                    <p id="votingError" className='text-danger text-center'></p>
                    <div className='text-center'>
                         <button className='btn btn-primary' onClick={()=>this.vote()}>Vote</button>
                    </div>
                    </div>
                    )

                    }
                    }

                    export default Voting;