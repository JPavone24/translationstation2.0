import React from "react";
import axios from "axios";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";


import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


class Signup extends React.Component {

  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    language: ""
  };

  signupInfo = event => {
    // console.log(event.target.value);
    // console.log(event.target);
    // console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleChange = event => {
    // console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value });
     
  }
  
  handleSubmit = event => {
      event.preventDefault();
      const signupuser = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        language: this.state.language,
      }; 
      console.log(signupuser)
      axios.post('http://localhost:5000/testapi/', signupuser)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location.href= "/signin" 
  }
  
  render() {
    return (
      <div>
      <Navbar/>
            <form  onSubmit={this.handleSubmit} id = "login-form" className="h-100">
            <div className = "container">
            <div className="row" id = "signup-whole-form">
                <div className="col-lg-6" id = "msg-form">
                  <div className="form-group" >
                      <label htmlFor="fullName">Full Name</label>
                      <input type="text" 
                              name="name"
                              className = "form-control"
                              placeholder = "name"  
                              onChange={this.handleChange} />
                  </div>
                  <div className="form-group" >
                      <label htmlFor="username"> Userame</label>
                      <input type="text" 
                              name="username"
                              className = "form-control"
                              placeholder = "username"  
                              onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" 
                              name="email"
                              className = "form-control"
                              placeholder = "email"  
                              onChange={this.handleChange}/>
                  </div>
            </div>
            <div className="col-lg-6">
                  {/* <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" 
                           name="password"
                           className = "form-control"
                           placeholder = "password"  
                           onChange={this.handleChange}/>
              </div> */}

            <p>LANGUAGE PREFERENCE</p>
              {/* <label htmlFor="password">Language</label> */}
              <FormControl className="col s12">
<InputLabel>Language</InputLabel> 
<Select
  name="language"
  value={this.state.language}
  onChange={this.handleChange} 
>
  <MenuItem value="english">English</MenuItem>
  <MenuItem value="french">French</MenuItem>
  <MenuItem value="italian">Italian</MenuItem>


</Select>
</FormControl> 

              <button
                id="button-SignUp"
                className="btn btn-primary"
                type="submit"
              >
                Sign Up
              </button>       
          </div>
          </div>   
      </div>
      </form>
      </div>
    );
  }
}
// Signup.contextTypes = {
//   router: React.PropTypes.func.isRequired
// };
export default Signup;
