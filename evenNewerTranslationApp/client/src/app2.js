import React from "react";
import Counter from "./components/Signin/bob";


// class App extends React.Component{
//   constructor(props) {
//   super(props)
//   this.state = {
//     mount:true
//   }
//   this.mountCounter = () => this.setState({mount:true})
//   this.unmountCounter = () => this.setState({mount:false})
// }

// render(){
//  return(
//    <div>
//      <button onClick = {this.mountCounter} >MountCounter</button>
//      <button onClick = {this.unmountCounter} >UnmountCounter</button>
//      {this.state.mount ? <Counter /> :null}
//    </div>
//  )
// }
// }
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

