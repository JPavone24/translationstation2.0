import React from "react";
import axios from "axios";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";


import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;
const ENDPOINT = 'localhost:5000'
var key = 'trnsl.1.1.20200321T011150Z.563510005b0cacad.a7542bd961483bff6ae7ef9b483d4afa341e5697'
var translate = require('yandex-translate')(key);
const parsed = queryString.parse(window.location.search);
console.log(parsed.lang)
var lang = parsed.lang


var loginArray = [];
var usernameArray = []
var nameArray = [];
var emailArray = []
var passwordArray = [];
var passwordArray2 = [];
var langPrefArray = [];
var signupBtnArray = [];
var signinLinkArray = [];


function TranslateText(text, array){
  translate.translate(text, { to: lang }, function(err, res) {
  console.log(res.text)
  array.push(res.text[0])
  });
}

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
      window.location.href= '/signin?lang=' + lang
  }
  
componentDidMount(){
  axios.get('http://localhost:5000/testapi/user')
  .then(res => {
  
    this.setState({persons: res.data})
  })

  socket = io(ENDPOINT)
  socket.on('translateText', function(data){

    TranslateText('signup', loginArray)
    TranslateText('name', nameArray)
    TranslateText('email', emailArray)
    TranslateText('username', usernameArray)
    TranslateText('password', passwordArray)
    TranslateText('confirm password', passwordArray2)
    TranslateText('language preference', langPrefArray)
    TranslateText('sign up', signupBtnArray)
    TranslateText('go to account', signinLinkArray)
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
      <Navbar/>
            <form  onSubmit={this.handleSubmit} className="h-100">
            <div className = "container">
            <div className="row" id = "signup-whole-form">
                <div className="col-lg-6" id = "msg-form">
                  <div className="form-group" >
                      <input type="text" 
                              name="name"
                              className = "form-control"
                              placeholder = {nameArray[0]}
                              onChange={this.handleChange} />
                  </div>

                  <div className="form-group" >
                    
                      <input type="text" 
                              name="username"
                              className = "form-control"
                              placeholder = {usernameArray[0]} 
                              onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                      <input type="email" 
                              name="email"
                              className = "form-control"
                              placeholder = {emailArray[0]} 
                              onChange={this.handleChange}/>
                  </div>
            </div>
            <div className="col-lg-6">
                <div className="form-group">
                  <input type="password" 
                           name="password"
                           className = "form-control"
                           placeholder = {passwordArray[0]}  
                           onChange={this.handleChange}/>
                </div> 
                <div className="form-group">
                  <input type="password" 
                           name="password2"
                           className = "form-control"
                           placeholder = {passwordArray2[0]}  
                           onChange={this.handleChange}/>
                </div> 
           
                
              {/* <label htmlFor="password">Language</label> */}
              <FormControl className="col s12">
              <InputLabel><p>{langPrefArray[0]} </p></InputLabel> 
              <Select
                name="language"
                value={this.state.language}
                onChange={this.handleChange} 
              >
              <MenuItem value="cy">Welsh</MenuItem>
              <MenuItem value="xh">Xhosa</MenuItem>
              <MenuItem value="ji">Yiddish</MenuItem>
              <MenuItem value="yo">Yoruba</MenuItem>
              <MenuItem value="zu">Zulu</MenuItem>

              </Select>
              </FormControl> 

            
              <button
                id="button-SignUp"
                className="btn btn-primary"
                type="submit"
              >
             
               {signupBtnArray[0]}
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
