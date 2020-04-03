import React from "react";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Newroom from "./components/Chat/newroom";
import Chat from "./components/Chat/Chat3";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Signin" component={Signin} />
          <Route exact path="/newroom" component={Newroom} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

