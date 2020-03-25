import React from "react";
import axios from "axios";
import queryString from 'query-string';
import io from "socket.io-client";
var key = 'trnsl.1.1.20200321T011150Z.563510005b0cacad.a7542bd961483bff6ae7ef9b483d4afa341e5697'
var translate = require('yandex-translate')(key);
var yandexTranslator = require('yandex-translator')(key);

let socket;
const ENDPOINT = 'localhost:5000'
var users = []
var messagearray = []
var messagearray2 = []
var messagearray3 = []
const parsed = queryString.parse(window.location.search);
var name = parsed.name
console.log("name : "+ name)
var msgReciever;
var acceptBtn = 'accept'
var enterChat = 'enter chat'



function TranslateEnterBtn(text){
  for(var i = 0; i < users.length; i++){
    if(users[i].username ===name){
      console.log(users[i].language)
      var lang = users[i].language
    }
  }
  translate.translate(text, { to: lang }, function(err, res) {
    enterChat = res.text
  });
}

function TranslateBtn(text, Btn){
  for(var i = 0; i < users.length; i++){
    if(users[i].username ===name){
      console.log(users[i].language)
      var lang = users[i].language
    }
  }
  translate.translate(text, { to: lang }, function(err, res) {
     acceptBtn = res.text
  });
}


function TranslateMessage(text, sender, array){
  for(var i = 0; i < users.length; i++){
    if(users[i].username ===name){
      console.log(users[i].language)
      var lang = users[i].language
    }
  }
  translate.translate(text, { to: lang }, function(err, res) {
    array.push({"user": sender, "text": res.text})
  });
}


export default class bob extends React.Component {
 

constructor(props){
  super(props)
  this.state = {
    counter: 10,
    persons: [],
    clickedPerson:'',
    language: '',
    reciever:'',
    sender: name,
    message: [messagearray]
  };
          

          this.handleClick = (event) => {
            console.log('===================HANDLECLICK EVENT=======================')
              var clickedUser = event.target.dataset.value
              msgReciever = clickedUser
              // console.log(msgReciever)
              // this.setState({clickedPerson: "you have invited" + clickedUser + " to chat!"})
              this.setState({reciever: clickedUser})
              socket.emit('invite', {"sender": name, "reciever": clickedUser , 'message':"you have invited " + clickedUser + " to chat!" }, () => {
              })
             
          }
    
        this.AcceptMessage = (event) => {
          console.log('=====================ACCEPT MESSAGE=====================')
            var accept = event.target.dataset.value
            console.log(this.state.reciever)
            console.log(msgReciever)
            socket.emit('join', {"response": accept, "sender":name, "reciever": msgReciever}, () => {
            })
            
          }
        this.goToChat = (event) => {
          console.log('====================GO TO CHAT======================')
          // console.log("go to room 101")
          console.log(msgReciever)
        
         window.location.href= "/chat?name=" + name + '&&name2=' + msgReciever + '&&room=randomroom' 
      }
}

componentDidMount(){
  axios.get('http://localhost:5000/testapi/user')
  .then(res => {
    // console.log(res.data)
    this.setState({persons: res.data})
    
  })
  socket = io(ENDPOINT)
  socket.emit('adduser', {"name": name}, () => {
  })
  socket.on('userlist', function(data){
    console.log('====================USERLIST======================')
    users.push(data)
    // console.log(data)
    console.log('==========================================')
  })

  socket.on('sendinvitation', function(data){
    console.log('============SEND INVITATION============')
    console.log(data.message[0])
    TranslateBtn('accept', acceptBtn)
    TranslateMessage(data.message, 'admin', messagearray)
    // messagearray.push(data)
    msgReciever = data.sender
  })

  socket.on('confirminvitation', function(data){
    console.log('============CONFIRM INVITATION============')
    console.log(data)
    TranslateEnterBtn('enter chat')
    TranslateMessage(data.message, 'admin', messagearray3)
  })

   
  socket.on('invitationAccepted', function(data){
    console.log('===========INVITATION ACCEPTED==============')
    // console.log(data)
    // console.log(users)
    TranslateEnterBtn('enter chat')
    TranslateMessage(data.message, 'admin', messagearray2)
    msgReciever = data.sender;
  })
 
}

componentDidUpdate(nextState){
  axios.get('http://localhost:5000/testapi/user')
  .then(res => {
    this.setState({persons: res.data})
  })
}
    render() {
    //  console.log("render")
        return<div>
          <h1> Welcome {name}</h1>
            <h5> {this.state.clickedPerson} </h5>
           {this.state.persons.map((user, i )=> <li  key = {i}><span  data-value = {user.username}onClick = {(event) => this.handleClick(event)}>{user.username}</span> <b>({user.language})</b></li>)} 
    {messagearray.map((message, i )=> <li  key = {i}><span><b> {message.user} </b>{message.text}</span> <button data-value = "accept" onClick = {(event) => this.AcceptMessage(event)}>{acceptBtn}</button></li>)}
    {messagearray3.map((message, i )=> <li  key = {i}><span><b>{message.user}: </b>{message.text}</span></li>)}
    {messagearray2.map((message, i )=> <li  key = {i}><span><b>{message.user} </b>{message.text}</span><button data-value = "getaRoom" onClick = {(event) => this.goToChat(event)}>{enterChat}</button></li>)}
          
         </div>   
    }
}

