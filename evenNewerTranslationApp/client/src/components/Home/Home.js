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
function TranslateText(text,lang){
  translate.translate(text, { to: lang }, function(err, res) {
  console.log(res.text)
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
      TranslateText('my name is jessica', lang)
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
                                          <option value="af">Afrikaans</option>
                                          <option value="sq">Albanian</option>
                                          <option value="am">Amharic</option>
                                          <option value="ar">Arabic</option>
                                          <option value="hy">Armenian</option> 

                                          <option value="az">Azerbaijani</option>
                                          <option value="bn">Bangla</option>
                                          <option value="eu">Basque</option>
                                          <option value="be">Belarussian</option>
                                          <option value="bs">Bosnian</option>

                                                                              
                                          <option value="bg">Bulgarian</option>
                                          <option value="my">Burmese</option>
                                          <option value="ca">Catalan</option>
                                          <option value="zh">Chinese</option>
                                          <option value="co">Corsican</option>

                                          <option value="hr">Croatian</option>
                                          <option value="cs">Czech</option>
                                          <option value="nl">Dutch</option>
                                          <option value="en">English</option>
                                          <option value="eo">Esperanto</option>

                                          <option value="et">Estonian</option>
                                          
                                          <option value="fi">Finnish</option>
                                          <option value="fr">French</option>
                                          <option value="gl">Galician</option>

                                          <option value="ka">Georgian</option>
                                          <option value="de">German</option>
                                          <option value="el">Greek</option>
                                          <option value="gu">Gujarati</option>
                                          <option value="ht">Haitian</option>

                                          
                                         
                                          <option value="iw">Hebrew</option>
                                          <option value="hi">Hindi</option>
                                          <option value="hm">Hmong</option>

                                          <option value="hu">Hungarian</option>
                                          <option value="is">Icelandic</option>
    
                                          
                                         

                                          <option value="it">Italian</option>
                                          <option value="ja">Japanese</option>
                                         
                                          <option value="kn">Kannada</option>
                                          <option value="kk">Kazakh</option>

                                          <option value="ko">Korean</option>
                                          <option value="km">Khmer</option>
                                         
                                          <option value="ky">Kirghiz</option>
                                          <option value="lo">Lao</option>

                                          <option value="la">Latin</option>
                                          <option value="lv">Latvian</option>
                                          <option value="lo">Lithuanian</option>
                                         
                                          <option value="mk">Macedonian</option>

                                          <option value="mg">Malagasy</option>
                                          <option value="ms">Malay</option>
                                          <option value="ml">Malayalam</option>
                                          <option value="mt">Maltese</option>
                                          <option value="mi">Maori</option>

                                          <option value="mr">Marathi</option>
                                          <option value="mn">Mongolian</option>
                                          <option value="ne">Nepali</option>
                                          <option value="no">Norwegian</option>
                                          <option value="ny">Nyanja</option>

                                         
                                          <option value="fa">Persian</option>
                                          <option value="pl">Polish</option>
                                          <option value="pt">Portuguese</option>
                                          <option value="pa">Punjabi</option>

                                          <option value="ro">Romanian</option>
                                          <option value="ru">Russian</option>
                                   
                                          <option value="gd">Scottish Gaelic</option>
                                          <option value="sr">Serbian</option>

                                          <option value="sn">Shona</option>
                                          <option value="sd">Sindhi</option>
                                          <option value="si">Sinhala</option>
                                          <option value="sk">Slovak</option>
                                          <option value="sl">Slovenian</option>

                                         
                                          <option value="es">Spanish</option>
                                          <option value="su">Sudanese</option>
                                          <option value="sw">Swahili</option>
                                          <option value="sv">Swedish</option>

                                          <option value="tg">Tajik</option>
                                          <option value="ta">Tamil</option>
                                          <option value="te">Telugu</option>
                                          <option value="th">Thai</option>
                                          <option value="tr">Turkish</option>

                                          <option value="uk">Ukrainian</option>
                                          <option value="ur">Urdu</option>
                                          <option value="uz">Uzbek</option>
                                          <option value="vi">Vietnamese</option>
                                        
                                          <option value="cy">Welsh</option>
                                          <option value="xh">Xhosa</option>
                                          
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
