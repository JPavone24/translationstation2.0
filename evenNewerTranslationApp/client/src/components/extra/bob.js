import React from "react";
import axios from "axios";

export default class bob extends React.Component {

constructor(props){
  super(props)
  this.state = {
    counter: 0,
    persons: [],
  };

  this.increment = () => this.setState({counter: this.state.counter + 1})
  this.decrement = () => this.setState({counter: this.state.counter - 1})
}

componentDidMount(){
  console.log('component did mount')
  console.log('_____________')
  axios.get('http://localhost:5000/testapi/')
  .then(res => {
    console.log(res.data)
    this.setState({persons: res.data})
  })

}

componentDidUpdate(){
  console.log('component did update')
  console.log('_____________')
}

    render() {
     console.log("render")
        return<div>
           <button onClick = {this.increment}>Increment</button>
           <button onClick = {this.decrement}>Decrement</button>
           counter: {this.state.counter}
           {this.state.persons.map((person, i )=> <li key = {i}>{person.username} ({person.language})</li>)}
         </div>   
    }
}

