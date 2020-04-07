import React from "react";
import axios from "axios";
import "./Signin.css";
import Navbar from "../Navbar/Navbar";
import queryString from 'query-string';
import io from "socket.io-client";
let socket;
const ENDPOINT = 'localhost:5000'


var key = 'trnsl.1.1.20200321T011150Z.563510005b0cacad.a7542bd961483bff6ae7ef9b483d4afa341e5697'
var translate = require('yandex-translate')(key);

const parsed = queryString.parse(window.location.search);
console.log(parsed.lang)
var lang = parsed.lang
console.log(lang)


var usernameArray = []
var loginArray = [];
var passwordArray = [];
var passwordArray2 = [];
var signinBtnArray = [];
var signUpLinkArray = [];


function TranslateText(text, array){
  translate.translate(text, { to: lang }, function(err, res) {
  console.log(res.text)
  array.push(res.text[0])
  });
}
TranslateText('username', usernameArray)
class Signin extends React.Component {

  state = {
    username: "",
    password: "",
    lang: ''
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
      persons: [],
      language: ''

    };

    console.log(user)

    axios.post('http://localhost:5000/testapi/user', user)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    window.location.href= "/newroom?name=" + this.state.username + '&&lang=' + lang
}

componentDidMount(){
    axios.get('http://localhost:5000/testapi/user')
    .then(res => {
    
      this.setState({persons: res.data})
    })

    socket = io(ENDPOINT)
    socket.on('translateText', function(data){

      TranslateText('login', loginArray)
      TranslateText('username', usernameArray)
      TranslateText('password', passwordArray)
      TranslateText('confirm password', passwordArray2)
      TranslateText('sign in', signinBtnArray)
      TranslateText('no account? click here to sign up', signUpLinkArray)
    })
}

componentDidUpdate(nextState){
  axios.get('http://localhost:5000/testapi/user')
  .then(res => {
    this.setState({persons: res.data})
  })
}

  render() {

    return (
      <div>
      <Navbar />
  
<div className = "container">
    <div className = "row">
        <div className = "col-lg-12">
        <h1>{this.state.language}</h1>
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
            <h1 className = "text-center" id = "signin-heading">{loginArray[0]}</h1>
                <div className="form-group" id = "group1">  
                    <input type="text" 
                           name="username"
                           className = "form-control"
                           placeholder = {usernameArray[0]}  
                           onChange={this.handleChange} 
                    />
                </div>

                <div className="form-group" id = "group2">
                    <input type="password" 
                           name="password" 
                           className = "form-control" 
                           placeholder = {passwordArray[0]}
                           onChange={this.handleChange} 
                    />
                </div>

                <div className="form-group" id = "group2">
                    <input type="password" 
                           name="password2" 
                           className = "form-control" 
                           placeholder = {passwordArray2[0]}
                           onChange={this.handleChange} 
                    />
                </div>
              
                <button id="signin-btn" type = "submit" className="btn waves-effect waves-light"
                >{signinBtnArray[0]}  
               </button>
               
               <a href = {'/signup?lang='+ lang}>
                <h6 className = "text-center">{signUpLinkArray[0]}</h6>
                </a>
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
