import React, {Component} from 'react';
// import user from './user.json';
import { Navigate } from "react-router-dom";
import axios from 'axios';

class LoginPage extends Component {
    constructor(){
        super()
        this.state = {redirect : false}
    }

    
    
    loginShow = ()=>{
        document.getElementById('signupForm').style.display = 'none'
        document.getElementById('loginForm').style.display = 'block'
    }
    signUpShow = ()=>{
        document.getElementById('signupForm').style.display = 'block'
        document.getElementById('loginForm').style.display = 'none'
    }

    loginSubmit = ()=>{
        var email = document.getElementById('loginInputEmail1').value;
        var password = document.getElementById('loginPassword').value;
        var error = document.getElementById('loginError');
  
        
        for(var i =0;i < this.props.users.length;i++){
            if(this.props.users[i].email === email && this.props.users[i].password === password){
                sessionStorage.setItem('user',i)
                this.setState({
                    redirect:true
                })
                return;
            }
        }
        error.innerText = "*User not Found."
    }
    signFormSubmit = ()=>{
        var email = document.getElementById('InputEmail1').value;
        var Conpassword = document.getElementById('confirmPassword').value;
        var name = document.getElementById('userName').value;
        var password = document.getElementById('password').value;
        var error = document.getElementById('signupError');
        
        if(Conpassword !== password){
            error.innerText = "*Passwords sid not matched."
            return;
        }
        if(password.length < 6){
            error.innerText = "Password length should be atleast 6."
            return;
        }
        for(var i =0;i < this.props.users.length;i++){
            if(this.props.users[i].email === email){
                error.innerText = "*Email Exists."
                // console.log("collison")
                return;
            }
        }

        this.props.users.push({
            "id":this.props.users.length,
            "name":name,
            "email":email,
            "password":password,
            "voted":-1
            });
        // Add data
        axios.post('/users',this.props.users
            
        ).then(res => sessionStorage.setItem('user',this.props.users.length -1))

        //redirect
        this.setState({
            redirect:true
        })
    }

    render(){

        if(this.state.redirect){
            return <Navigate to='./voting' />
        }
        return (
            <div >
                <h1 className="text-center" style={{marginTop:"100px"}}>Student Gymkhana Election</h1>
                <div className='col-7 text-center'>
                    <button onClick={()=>this.loginShow()} className='m-2 btn btn-primary'>Login</button>
                    <button onClick={()=>this.signUpShow()} className=' btn btn-primary'>SignUp</button>
                </div>

                <div  id="signupForm" className="m-auto col-7">
                    <form >
                    <h3>Sign Up form</h3>
                        <div className="mb-3">
                            <label htmlFor="InputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="InputEmail1"
                                aria-describedby="emailHelp"required/>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Username</label>
                            <input type="text" className="form-control" id="userName" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" required/>
                        </div>
                        <p className='text-danger' id="signupError"></p>
                        
                    </form>
                    <button type="submit" className="btn btn-primary" onClick={()=>this.signFormSubmit()}>Sign Up</button>
                </div>

                <div id="loginForm" style={{display:"none"}}  className="m-auto col-7"  >
                    <form >
                    <h3>Login form</h3>
                        <div className="mb-3">
                            <label htmlFor="loginInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="loginInputEmail1"
                                aria-describedby="emailHelp" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="loginPassword" required/>
                        </div>
                        <p className='text-danger' id="loginError"></p>


                    </form>
                    <button type="submit" className="btn btn-primary" onClick={()=>this.loginSubmit()}>Login</button>
                </div>
            </div>
        );
    }

}
export default LoginPage;