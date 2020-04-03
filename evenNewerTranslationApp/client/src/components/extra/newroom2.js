import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;


const Chat =({location}) => {
    
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const {name} = queryString.parse(location.search);      
        socket = io(ENDPOINT)
        setName(name);
        socket.emit('adduser', name, () => {
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
}, [messages])

useEffect(() =>{
    socket.on('userlist', (users) =>{
        console.log(users)
        setUsers([users])
    },
    console.log(users)
    )
   
})



const sendMessage =(event)=> {
    console.log(message)
    event.preventDefault()
    socket.emit('sendMessage', message )
}

      return (
        <div>
            <h1>Welcome {name}</h1>
            <h1>Welcome {user}</h1>
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