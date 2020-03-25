import React from "react";
import axios from "axios";
import "./Signin.css";
import Navbar from "../Navbar/Navbar";

class Signin extends React.Component {
  state = {
    username: "",
    password: ""
  };

handleChange = event => {
  console.log(event.target.name)
  this.setState({[event.target.name]: event.target.value });
  this.setState({[event.target.name]: event.target.value });
}

handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    console.log(user)

    axios.post('http://localhost:5000/testapi/user', user)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    window.location.href= "/newroom?name=" + this.state.username
}

  render() {
    return (
      <div>
      <Navbar />
  
<div className = "container">
    <div className = "row">
        <div className = "col-lg-12">
          
        </div>
    </div>
{/* <!-- end of heading --> */}
{/* <!-- form --> */} 
    <div className = "row" id = "whole-form">
        {/* <!-- baby yoda pic --> */}
        <div className = "col-lg-6 ">
          <img className = "img-fluid" id = "signin-img" src = "./Image/girl2.png" alt = "noimage"></img>
        </div>

        {/* <!-- fill out part --> */}
        <div className = "col-lg-6">
       
            <form  onSubmit={this.handleSubmit} id = "login-form" className="h-100">
            <h1 className = "text-center" id = "signin-heading">Log in</h1>
                <div className="form-group" id = "group1"> 
                    <p> username</p>   
                   
                    <input type="text" 
                           name="username"
                           className = "form-control"
                           placeholder = "username"  
                           onChange={this.handleChange} 
                    />
                </div>

                <div className="form-group" id = "group2">
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
               <h6 className = "text-center">Not a member? Sign up!</h6>

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
