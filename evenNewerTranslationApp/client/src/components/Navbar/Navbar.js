import React from "react";
import "../Navbar/Navbar.css";
// import LogoImg from "../../Image/logoImg.png";
 
function Navbar() {
  return(
          <nav id = "nav-bar" class="navbar navbar-expand-lg static-top">
          <div class="container">
              <a class="navbar-brand js-scroll-trigger" href="/" id = "title">Translation Station</a>
              <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i class="fas fa-bars"></i>
              </button>
              <div class="collapse navbar-collapse" id="sidebar">
              <ul class="navbar-nav text-uppercase ml-auto">
                  <li class="nav-item">
                  <a id = "link1" class="nav-link js-scroll-trigger" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                  <a id = "link2" class="nav-link js-scroll-trigger" href="/signin">Signin</a>
                  </li>  
                  <li class="nav-item">
                      <a id = "link3" class="nav-link js-scroll-trigger" href="/signup">Signup</a>
                  </li>
                  <li class="nav-item">
                      <a id = "link4"class="nav-link js-scroll-trigger" href="/chat">Chat</a>
                  </li>
              </ul>
              </div>
          </div>
      </nav>
  )
}
export default Navbar;
