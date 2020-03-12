import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

const Chat =({location}) => {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);      
        socket = io(ENDPOINT)
        setName(name);
        setRoom(room);
    
        socket.emit('join', {name, room}, () => {
        })
      
        return() => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search]);

useEffect(() =>{
    socket.on('message', (message) =>{
        setMessages([...messages, message])
    })
    console.log(messages)
}, [messages]

)

const sendMessage =(event)=> {
    console.log(message)
    event.preventDefault()
    socket.emit('sendMessage', message )
}

      return (
        <div>
            <h1>Welcome {name} to Room: {room}</h1>
            <div id = "chatroom"></div>
            {messages.map((message, i) => <div key = {i}> {message.user}: {message.text}</div>)}
            <form onSubmit = {(event) => sendMessage(event)}>
            <label>
              Message
              <input 
              type="text"
              name="message"
              onChange = {(event) => setMessage(event.target.value)} 
              />
            </label>
            <button type = "submit">
                Add
            </button>
          </form>
        </div>
      )
  }

  
  export default Chat