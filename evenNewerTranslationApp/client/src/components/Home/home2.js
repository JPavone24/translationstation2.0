import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";


class Home extends Component {
  render() {
    return (
    <div className = 'container'>
        <div className = "row">

           
                <div className = "col-lg-4">
                    <a href = '/signin?lang=en'> 
                        <img href = '/signin?lang=en' className = "img-fluid" src = "./Image/flags/USA.png" alt = "noimage"></img>
                        <h3 class = 'text-center'>Click your language to enter</h3>
                    </a> 
                </div>

                <div className = "col-lg-4">
                    <a href = '/signin?lang=fr'> 
                        <img href = '/signin?lang=fr' className = "img-fluid" src = "./Image/flags/france.png" alt = "noimage"></img>
                        <h3 class = 'text-center'>Click your language to enter</h3>
                    </a> 
                </div>

                <div className = "col-lg-4">
                    <a href = '/signin?lang=it'> 
                        <img href = '/signin?lang=en' className = "img-fluid" src = "./Image/flags/italy.jpg" alt = "noimage"></img>
                        <h3 class = 'text-center'>Click your language to enter</h3>
                    </a> 
                </div>
           

        
         
        </div>
    </div>
    );
  }
}
export default Home;
