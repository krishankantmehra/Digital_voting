
import './App.css';
import LoginPage from "./componant/LoginPage";
import Voting from "./componant/Voting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from 'react';
import axios from 'axios';


class App extends Component{
  constructor(){
    super()
    this.state = {
      users:[],
      data:false
    }
  }
  componentDidMount(){
    axios.get('/users').then(
        res => {
           this.setState({
             users : res.data,
             data:true
           })
          //  console.log(this.state.users)
        }
    )
    
}

  render(){
    if(this.state.data === false)return <h1>Loading...</h1>
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" >
                <Route index element={<LoginPage users={this.state.users}/>} />
                <Route path="voting" element={<Voting users={this.state.users}/>} />
                
            </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
