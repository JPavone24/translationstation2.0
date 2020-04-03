import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";



let socket;

const Chat =({location}) => {
    
    const [name, setName] = useState('');
    const [name2, setName2] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        socket = io(ENDPOINT)
        const {name, room, name2} = queryString.parse(location.search);     
        console.log(name, room, name2) 
        setName(name);
        setName2(name2);
        setRoom(room);
  
        socket.emit('enterChat', {name, room, name2}, () => {
        })    
        return() => {
            socket.emit('disconnect')
            socket.off()
        }
    } ,
    [ENDPOINT, location.search]
    );

useEffect(() =>{
    socket.on('message', (message) =>{
        console.log(message)
        setMessages([...messages, message])
        console.log(messages)
    })
 
}, [messages]
)

const sendMessage =(event)=> {
   event.preventDefault()
   console.log(message)
   socket.emit('sendMessage', {
     'sender': name,
     'reciever': name2,
     'message': message,
     'room': room,
   })
}

      return (
        <div>
             <h1>Welcome {name} to Room: {room}</h1>
            <div id = "chatroom"></div>
            {messages.map((message, i )=> <li  key = {i}><span><b>{message.user}:</b> {message.textT}</span></li>)}
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