import React from "react";
import Home from "./components/Home/Home";
import Signin from "./components/Signin/Join";
import Chat from "./components/Chat/Chat2";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Signin" component={Signin} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

