import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import io from "socket.io-client";
import axios from "axios";
let socket;
const ENDPOINT = 'localhost:5000'

var key = 'trnsl.1.1.20200321T011150Z.563510005b0cacad.a7542bd961483bff6ae7ef9b483d4afa341e5697'
var translate = require('yandex-translate')(key);



var connectingArray = []  
function TranslateText(text,lang, array){
  translate.translate(text, { to: lang }, function(err, res) {
  console.log(res.text)
  array.push(res.text[0])
  });
}

class Home extends Component {
  
  state = {
    language: "",
    persons: [],
    subheading1: 'connecting the world',
    subheading2: 'without borders',
  };

  

  handleChange = event => {
      var lang = event.target.value
      console.log(lang)
      this.setState({language: lang})
}
  
    
    handleSubmit = event => {
      console.log(this.state.language)
        event.preventDefault();
           var lang = this.state.language
          window.location.href= '/signin?lang=' + lang
    }




  render() {
    return (
      <div>
         <Navbar />
              <div className="col-lg-12" id="main-text">
                  <div className = " text-center" id = "header-background"> 
             
                  <div className = 'container' id = 'whole-front-page'>
                  <h1 className = 'text-center' id = "heading">Translation Station</h1>
                  <div className = "row">
                      <div className = "col-lg-3">
                          <a href = '/signin?lang=en'> 
                              <img href = '/signin?lang=en' className = "img-fluid" src = "./Image/flags/USA.png" alt = "noimage"></img>
                              <h3 class = 'text-center'>Click your language to enter</h3>
                          </a> 
                      </div>

                      <div className = "col-lg-3">
                          <a href = '/signin?lang=fr'> 
                              <img href = '/signin?lang=fr' className = "img-fluid" src = "./Image/flags/france.png" alt = "noimage"></img>
                              <h3 class = 'text-center'>Cliquez sur votre langue pour entrer</h3>
                          </a> 
                      </div>

                      <div className = "col-lg-3">
                          <a href = '/signin?lang=it'> 
                              <img href = '/signin?lang=en' className = "img-fluid" src = "./Image/flags/italy.jpg" alt = "noimage"></img>
                              <h3 class = 'text-center'>Fai clic sulla tua lingua per accedere</h3>
                          </a> 
                      </div>

                      <div className = "col-lg-3">
                          <a href = '/signin?lang=it'> 
                              <img href = '/signin?lang=zh' className = "img-fluid" src = "./Image/flags/china.png" alt = "noimage"></img>
                              <h3 class = 'text-center'>點擊您的語言進入 Diǎnjī nín de yǔyán jìnrù</h3>
                          </a> 
                      </div>
           </div>
 
                  <div id = "sub-heading">
                  <h2> {this.state.subheading1}</h2>
                  <h3>{this.state.subheading2}</h3>
                 </div>


              
                 <form  onSubmit={this.handleSubmit}>

                      <div className = 'row'>
                            <div className="col-lg-8">  
                                  <div class="form-group">
                                      <select className = 'form-control'name="language" value={this.state.language}onChange={this.handleChange}>
                                          <option value="null">select another language</option>
                                          <option value="cy">Welsh</option>
                                          <option value="xh">Xhosa</option>
                                          {/* <option value="ji">Yiddish</option>
                                          <option value="yo">Yoruba</option>
                                          <option value="zu">Zulu</option> */}
                                      </select>
                                  </div> 
                            </div>

                            <div className="col-lg-4">
                                  <div class="form-group">
                                        <button id="button-SignUp" className="btn btn-primary float-left w-100"  type="submit"> Enter</button>  
                                  </div>  
                            </div>
                      </div>
                </form>
                 </div>
                 </div>
        </div>      
    </div>
      
    );
  }
}
export default Home;
