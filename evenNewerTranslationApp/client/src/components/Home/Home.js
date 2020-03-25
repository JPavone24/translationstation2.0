import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";


class Home extends Component {
  render() {
    return (
      <div>
         <Navbar />
              <div className="col-lg-12" id="main-text">
                  <div className = " text-center" id = "header-background">
                  <h1 id  = "heading">Translation Station</h1>
                  <div id = "sub-heading">
                  <h2> Connecting The World</h2>
                  <h3>With Out Borders!</h3>
              </div>
        </div>      
    </div>
      
      </div>
    );
  }
}
export default Home;
