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
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value });
  }
  
  handleSubmit = event => {
      event.preventDefault();
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        language: this.state.language,
      };
  
      axios.post('http://localhost:9000/testapi', user)
      .then(res => console.log(res.data));
  }
  
  render() {
    return (
      <div>
      <Navbar />
      <div class = "container">
         <div className="row" id = "signup-whole-form">
            <div className="col-lg-6" id = "msg-form">
            <form  onSubmit={this.handleSubmit} id = "login-form" class="h-100">
              <p>PERSONAL INFORMATION</p>
              <div class="form-group" >
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" 
                           name="name"
                           className = "form-control"
                           placeholder = "name"  
                           onChange={this.handleChange} 
                    />
              </div>
              <br />
              <p>ACCOUNT SECURITY</p>
              <div class="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" 
                           name="email"
                           className = "form-control"
                           placeholder = "email"  
                           onChange={this.handleChange} 
                    />
              </div>

              <div class="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" 
                           name="password"
                           className = "form-control"
                           placeholder = "password"  
                           onChange={this.handleChange} 
                  />
              </div>
              <br />
              <p>LANGUAGE PREFERENCE</p>
              {/* <label htmlFor="password">Language</label> */}
              
<FormControl className="col s12">
<InputLabel>Language</InputLabel> 
<Select
  name="language"
  value={this.state.language}
  onChange={this.handleChange} 
>
  <MenuItem value="af">Afrikaans</MenuItem>
  <MenuItem value="sq">Albanian</MenuItem>
  <MenuItem value="am">Amharic</MenuItem>
  <MenuItem value="ar">Arabic</MenuItem>
  <MenuItem value="hy">Armenian</MenuItem>

  <MenuItem value="az">Azerbaijani</MenuItem>
  <MenuItem value="bn">Bangla</MenuItem>
  <MenuItem value="eu">Basque</MenuItem>
  <MenuItem value="be">Belarussian</MenuItem>
  <MenuItem value="bs">Bosnian</MenuItem>

  <MenuItem value="bg">Bulgarian</MenuItem>
  <MenuItem value="my">Burmese</MenuItem>
  <MenuItem value="ca">Catalan</MenuItem>
  <MenuItem value="zh">Chinese</MenuItem>
  <MenuItem value="co">Corsican</MenuItem>

  <MenuItem value="hr">Croatian</MenuItem>
  <MenuItem value="cs">Czech</MenuItem>
  <MenuItem value="nl">Dutch</MenuItem>
  <MenuItem value="en">English</MenuItem>
  <MenuItem value="eo">Esperanto</MenuItem>

  <MenuItem value="et">Estonian</MenuItem>
  <MenuItem value="fl">Filipino</MenuItem>
  <MenuItem value="fi">Finnish</MenuItem>
  <MenuItem value="fr">French</MenuItem>
  <MenuItem value="gl">Galician</MenuItem>

  <MenuItem value="ka">Georgian</MenuItem>
  <MenuItem value="de">German</MenuItem>
  <MenuItem value="el">Greek</MenuItem>
  <MenuItem value="gu">Gujarati</MenuItem>
  <MenuItem value="ht">Haitian</MenuItem>

  <MenuItem value="ha">Hausa</MenuItem>
  <MenuItem value="hw">Hawaiian</MenuItem>
  <MenuItem value="iw">Hebrew</MenuItem>
  <MenuItem value="hi">Hindi</MenuItem>
  <MenuItem value="hm">Hmong</MenuItem>

  <MenuItem value="hu">Hungarian</MenuItem>
  <MenuItem value="is">Icelandic</MenuItem>
  <MenuItem value="ig">Igbo</MenuItem>
  <MenuItem value="in">Indonesian</MenuItem>
  <MenuItem value="ir">Irish</MenuItem>

  <MenuItem value="it">Italian</MenuItem>
  <MenuItem value="ja">Japanese</MenuItem>
  <MenuItem value="jw">Javanese</MenuItem>
  <MenuItem value="kn">Kannada</MenuItem>
  <MenuItem value="kk">Kazakh</MenuItem>

  <MenuItem value="ko">Korean</MenuItem>
  <MenuItem value="km">Khmer</MenuItem>
  <MenuItem value="ku">Kurdish</MenuItem>
  <MenuItem value="ky">Kirghiz</MenuItem>
  <MenuItem value="lo">Lao</MenuItem>

  <MenuItem value="la">Latin</MenuItem>
  <MenuItem value="lv">Latvian</MenuItem>
  <MenuItem value="lo">Lithuanian</MenuItem>
  <MenuItem value="lu">Luxembourgish</MenuItem>
  <MenuItem value="mk">Macedonian</MenuItem>

  <MenuItem value="mg">Malagasy</MenuItem>
  <MenuItem value="ms">Malay</MenuItem>
  <MenuItem value="ml">Malayalam</MenuItem>
  <MenuItem value="mt">Maltese</MenuItem>
  <MenuItem value="mi">Maori</MenuItem>

  <MenuItem value="mr">Marathi</MenuItem>
  <MenuItem value="mn">Mongolian</MenuItem>
  <MenuItem value="ne">Nepali</MenuItem>
  <MenuItem value="no">Norwegian</MenuItem>
  <MenuItem value="ny">Nyanja</MenuItem>

  <MenuItem value="ps">Pashto</MenuItem>
  <MenuItem value="fa">Persian</MenuItem>
  <MenuItem value="pl">Polish</MenuItem>
  <MenuItem value="pt">Portuguese</MenuItem>
  <MenuItem value="pa">Punjabi</MenuItem>

  <MenuItem value="ro">Romanian</MenuItem>
  <MenuItem value="ru">Russian</MenuItem>
  <MenuItem value="sm">Samoan</MenuItem>
  <MenuItem value="gd">Scottish Gaelic</MenuItem>
  <MenuItem value="sr">Serbian</MenuItem>

  <MenuItem value="sn">Shona</MenuItem>
  <MenuItem value="sd">Sindhi</MenuItem>
  <MenuItem value="si">Sinhala</MenuItem>
  <MenuItem value="sk">Slovak</MenuItem>
  <MenuItem value="sl">Slovenian</MenuItem>

  <MenuItem value="so">Somali</MenuItem>
  <MenuItem value="es">Spanish</MenuItem>
  <MenuItem value="su">Sudanese</MenuItem>
  <MenuItem value="sw">Swahili</MenuItem>
  <MenuItem value="sv">Swedish</MenuItem>

  <MenuItem value="tg">Tajik</MenuItem>
  <MenuItem value="ta">Tamil</MenuItem>
  <MenuItem value="te">Telugu</MenuItem>
  <MenuItem value="th">Thai</MenuItem>
  <MenuItem value="tr">Turkish</MenuItem>

  <MenuItem value="uk">Ukrainian</MenuItem>
  <MenuItem value="ur">Urdu</MenuItem>
  <MenuItem value="uz">Uzbek</MenuItem>
  <MenuItem value="vi">Vietnamese</MenuItem>
  <MenuItem value="vo">Volapuk</MenuItem>

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
                Sign Up
              </button>
              </form>
            </div>
            <div className="col-lg-6">
              <img class = "img-fluid" alt ="noimage" src = "/Image/hipster.jpeg" id = "signup-img"></img>
      
      </div>
      </div>   
      </div>
      </div>
    );
  }
}
// Signup.contextTypes = {
//   router: React.PropTypes.func.isRequired
// };
export default Signup;
