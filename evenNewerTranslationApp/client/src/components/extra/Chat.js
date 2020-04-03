import React from 'react';
import io from "socket.io-client";
import queryString from 'query-string';
var usersInRoom = []
let socket;
// var socket = io.connect('http://localhost:5000/',{
//   transports: ["websocket", "polling"]
// });
const ENDPOINT = 'localhost:5000'

export default class Chat extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    message: '',
    messages: [],
    personsinroom:[]
  }

  this.handleChange = event => {
    console.log(event.target.name)
    this.setState({[event.target.id]: event.target.value });
  }
  this.handleSubmit = event => {
    console.log('submit')
  }
}

  componentDidMount() {
    socket = io(ENDPOINT)
    // const {name, room, name2} = queryString.parse(window.location.search);     
    // console.log(name, room, name2) 
    // socket.emit('startChat',{name, room, name2})
    // socket.on("userlist", function(data){
    //   console.log(data)
    // usersInRoom.push(data)
    // console.log(usersInRoom)
    // })
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Message
            <input type="text" id="message" onChange={this.handleChange} />
          </label>
          <button  onClick={this.handleSubmit}>Add</button>
        </form>
      </div>
    )
  }
}


