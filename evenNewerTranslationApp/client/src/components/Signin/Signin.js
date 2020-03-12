import React from "react";
import axios from "axios";
import "./Signin.css";
import Navbar from "../Navbar/Navbar";

class Signin extends React.Component {
  state = {
    email: "",
    password: ""
  };

handleChange = event => {
  console.log(event.target.name)
  this.setState({[event.target.name]: event.target.value });
}

handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    
    axios.get('http://localhost:8000/:user', user)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    localStorage.setItem('email', this.state.email)
    window.location.href= "/chat"
}

  render() {
    return (
      <div>
      <Navbar />
  
<div class = "container">
    <div class = "row">
        <div class = "col-lg-12">
          
        </div>
    </div>
{/* <!-- end of heading --> */}
{/* <!-- form --> */} 
    <div class = "row" id = "whole-form">
        {/* <!-- baby yoda pic --> */}
        <div class = "col-lg-6 ">
          <img class = "img-fluid" id = "signin-img" src = "./Image/girl2.png" alt = "noimage"></img>
        </div>

        {/* <!-- fill out part --> */}
        <div class = "col-lg-6">
       
            <form  onSubmit={this.handleSubmit} id = "login-form" class="h-100">
            <h1 class = "text-center" id = "signin-heading">Log in</h1>
                <div class="form-group" id = "group1"> 
                    <p> Email</p>   
                   
                    <input type="email" 
                           name="email"
                           className = "form-control"
                           placeholder = "email"  
                           onChange={this.handleChange} 
                    />
                </div>

                <div class="form-group" id = "group2">
                    <p> Password</p>
                    <input type="password" 
                           name="password" 
                           className = "form-control" 
                           placeholder = "password"
                           onChange={this.handleChange} 
                    />
                </div>

                <button id="signin-btn" type = "submit" className="btn waves-effect waves-light"
                >Sign In  
               </button>
               <h6 class = "text-center">Not a member? Sign up!</h6>

            </form>
        </div>
        {/* <!-- end of form --> */}
    </div>
    {/* <!-- end of row --> */}
</div>
</div>
     
    );
  }
}

export default Signin;
