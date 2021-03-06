import React from "react";
import "../Navbar/Navbar.css";
// import LogoImg from "../../Image/logoImg.png";
 
function Navbar() {
  return(
          <nav id = "nav-bar" className="navbar navbar-expand-lg static-top">
          <div className="container">
              <a className="navbar-brand js-scroll-trigger" href="/" id = "title">Translation Station</a>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="sidebar">
              <ul className="navbar-nav text-uppercase ml-auto">
                  <li className="nav-item">
                  <a id = "link1" className="nav-link js-scroll-trigger" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                  <a id = "link2" className="nav-link js-scroll-trigger" href="/signin">Signin</a>
                  </li>  
                  <li className="nav-item">
                      <a id = "link3" className="nav-link js-scroll-trigger" href="/signup">Signup</a>
                  </li>
                  <li className="nav-item">
                      <a id = "link4"className="nav-link js-scroll-trigger" href="/chat">Chat</a>
                  </li>
              </ul>
              </div>
          </div>
      </nav>
  )
}
export default Navbar;
