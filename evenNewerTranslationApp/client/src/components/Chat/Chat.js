import React from 'react';
import io from "socket.io-client";
var socket = io.connect('http://localhost:8000/',{
  transports: ["websocket", "polling"]
});
class Chat extends React.Component {
  state = {
    message: '',
  }
  componentDidMount() {
    socket.on("hello", function(data){
      console.log(data)
    })
  }
  handleChange = event => {
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value });
  }
 
handleSubmit = event => {
    localStorage.setItem('message', this.state.message)
    socket.emit('message', this.state.message)
}
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Message
            <input type="text" name="message" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}


export default Chat