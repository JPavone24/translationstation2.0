import React from "react";
import axios from "axios";
import queryString from 'query-string';
import io from "socket.io-client";
import "./Chat.css";
import Navbar from "../Navbar/Navbar";

var key = 'trnsl.1.1.20200321T011150Z.563510005b0cacad.a7542bd961483bff6ae7ef9b483d4afa341e5697'
var translate = require('yandex-translate')(key);


let socket;
const ENDPOINT = 'localhost:5000'
var users = []
var messagearray = []
var messagearray2 = []
var messagearray3 = []
var messagearray4 = []
var messagearray5 = []
var messagearray6 = []
const parsed = queryString.parse(window.location.search);
var name = parsed.name
var lang = parsed.lang
// console.log("name : "+ name)
var msgReciever;
var acceptBtn = 'accept'
var enterChat = 'enter chat'
var thisRoom;
var userlanguage = ''
var mygreeting;



function TranslateBtn(text, Btn){
  translate.translate(text, { to: lang }, function(err, res) {
    console.log(res.text)
    Btn = res.text
  });
}

function TranslateMessage(text, sender, array){
  translate.translate(text, { to: lang}, function(err, res) {
    console.log(res.text)
     array.push({"user": sender, "text": res.text})
  });
}

var headingArray = [];
var greetingArray = [];
var instrucationsArray = [];
var labelArray = [];



export default class bob extends React.Component {
 

constructor(props){
  super(props)
  this.state = {
    persons: [],
    heading: '',
    greeting: '',
  };
            this.handleChange = event => {
              console.log(event.target.name)
              this.setState({[event.target.id]: event.target.value });
            }
            this.groupSubmit = event => {
              event.preventDefault()
              console.log(this.state.message)
              socket.emit('groupmsg' ,{
                'username':name, 'message':this.state.message
              })
            }
  
            this.handleClick = (event) => {
            console.log('===================HANDLECliCK EVENT=======================')
              var clickedUser = event.target.dataset.value
              msgReciever = clickedUser
              console.log(msgReciever)
              socket.emit('invite', {"sender": name, "reciever": msgReciever , 'message':"you have invited " + clickedUser + " to chat!" }, () => {
              })
            }
    
            this.AcceptMessage = (event) => {
              console.log('=====================ACCEPT MESSAGE=====================')
                var accept = event.target.dataset.value
                console.log(msgReciever)
                socket.emit('join', {"response": accept, "sender":name, "reciever": msgReciever}, () => {
                })
            }
          
            this.AcceptMessagefromRoom = (event) => {
            console.log('=====================ACCEPT MESSAGE from room=====================')
              var accept = event.target.dataset.value
              console.log(msgReciever)
              console.log(thisRoom)
              window.open("/chat?name=" + name + '&&room=' + thisRoom)
            }

            this.goToChat = (event) => {
              console.log('====================GO TO CHAT======================')
              // console.log("go to room 101")
              console.log(msgReciever)
              var nameArray = []
                  nameArray.push(name)
                  nameArray.push(msgReciever)
                  nameArray.sort()
                  console.log(nameArray)
                  var room = nameArray[0] + nameArray[1]
                  console.log(room)
            window.location.href = "/chat?name=" + name + '&&lang=' + lang + '&&room=' + room
            }
    
            this.goToJoinOthers = (event) => {
              console.log('====================GO TO Join Others======================')
              // console.log("go to room 101")  
            window.open("/chat?name=" + name + '&&room=' + thisRoom)
          }  
            this.Bob = (event) => {
              console.log('====================GO TO CHAT======================')
              console.log(name)  
              console.log(msgReciever)
       
          }

}

componentDidMount(){

    this.setState({heading: 'heading'})
    this.setState({greeting: 'greeting'})

  axios.get('http://localhost:5000/testapi/user')
  .then(res => {
    this.setState({persons: res.data})
  })
  axios.get('http://localhost:5000/testapi/user/' + name)
  .then(res => {
    userlanguage = res.data.language
    console.log(userlanguage)
  })
 
  socket = io(ENDPOINT)
 
  socket.emit('adduser', {"name": name}, () => {
  })
 
  socket.on('translateText', function(data){
    console.log(data)
    function TranslateText(text, array){
      translate.translate(text, { to: lang }, function(err, res) {
      array.push(res.text)
      });
  }
    TranslateText('Group Chat', headingArray)
    TranslateText("welcome " + name, greetingArray)
    TranslateText('Click on username for private chat', instrucationsArray)
    TranslateText("chat with all users", labelArray)

  })
  socket.on('sendinvitation', function(data){
    console.log('============SEND INVITATION============')
    console.log(data.message[0])
    TranslateBtn('accept', acceptBtn)
    TranslateMessage(data.message, 'admin', messagearray)
    msgReciever = data.sender
  })



  socket.on('recieveGroupMsg', function(data){
     console.log(data)
     TranslateMessage(data.message, data.username, messagearray3)
  })


  socket.on('confirminvitation', function(data){
    console.log('============CONFIRM INVITATION============')
    console.log(data)
    TranslateBtn('enter chat' )
    TranslateMessage(data.message, 'admin', messagearray3)
  })

   
  socket.on('invitationAccepted', function(data){
    console.log('===========INVITATION ACCEPTED==============')
    TranslateBtn('enter chat', enterChat)
    TranslateMessage(data.message, 'admin', messagearray2)
    msgReciever = data.sender;
  })
  socket.on('acceptRoom', function(data){
    console.log('============SEND INVITATION============')
    console.log(data)
    console.log(data.room)
    thisRoom = data.room
    TranslateBtn('accept', acceptBtn)
    TranslateMessage(data.message, 'admin', messagearray4)
  })
  // socket.on('invitationFromRoom', function(data){
  //   console.log(data)
  //   thisRoom = data.room
  //   msgReciever = data.sender;
  //   TranslateMessage(data.message, 'admin', messagearray4)
  // })

  // socket.on('goToRoom', function(data){
  //   console.log(data)
   
  //   TranslateEnterBtn('enter chat')
  //   TranslateMessage(data.message, 'admin', messagearray5)
  // })

  // socket.on('goToNewRoom', function(data){
  //   console.log(data)
   
  //   TranslateEnterBtn('enter chat')
  //   TranslateMessage(data.message, 'admin', messagearray6)
  // })

}

componentDidUpdate(nextState){
  axios.get('http://localhost:5000/testapi/user')
  .then(res => {
    this.setState({persons: res.data})
  })
}

render() {

  return<div>
     <Navbar />
      <div className = 'container'>
        <h1>{mygreeting}</h1>
      <h1 id = 'heading' className = 'text-center'>{headingArray[0]}</h1>
          <div className = "row"  id = "chat-form">
                <div className = "col-lg-4" id = "names">
                    <div id = "names">
                    <h3 id = "name-greeting" className = 'text-center'>{greetingArray[0]}</h3>

                        <h5 className = 'text-center'>{instrucationsArray[0]}</h5>
                        {this.state.persons.map((user, i )=> <li  key = {i}><span  data-value = {user.username}onClick = {(event) => this.handleClick(event)}>{user.username}</span> <b>({user.language})</b></li>)} 
                    </div>
                </div>

               <div className = "col-lg-8" id = 'message-box'>
                  <h1 className = 'text-center'>{labelArray[0]}</h1>
                    <div id = "messages">
                        {messagearray3.map((message, i )=> <div key = {i}><span><b>{message.user}: </b>{message.text}</span></div>)}
                        {messagearray.map((message, i )=> <div key = {i}><span><b> {message.user} </b>{message.text}</span> <button data-value = "accept" onClick = {(event) => this.AcceptMessage(event)}>{acceptBtn}</button></div>)}
                        {messagearray2.map((message, i )=> <div key = {i}><span><b>{message.user} </b>{message.text}</span><button data-value = "getaRoom" onClick = {(event) => this.goToChat(event)}>{enterChat}</button></div>)}
                        {messagearray4.map((message, i )=> <div key = {i}><span><b> {message.user} </b>{message.text}</span> <button data-value = "accept" onClick = {(event) => this.AcceptMessagefromRoom(event)}>{acceptBtn}</button></div>)}
                        {messagearray5.map((message, i )=> <div key = {i}><span><b>{message.user} </b>{message.text}</span><button data-value = "joinPvtRoom" onClick = {(event) => this.goToJoinOthers(event)}>{enterChat}</button></div>)}
                        {messagearray6.map((message, i )=> <div key = {i}><span><b>{message.user} </b>{message.text}</span><button data-value = "joinPvtRoom" onClick = {(event) => this.Bob(event)}>{enterChat}</button></div>)}
                    </div>
                    <form>
                      <div className = 'row' id = 'input'>
                          <div className = 'col-lg-9'>
                              <input className = "h-100 w-100" type="text" id="message" onChange={this.handleChange}/>
                          </div>
                          <div className = 'col-lg-3'>
                              <button className = "btn btn-primary w-100" id = 'button1' onClick={this.groupSubmit}>Add</button> 
                          </div> 
                      </div>
                    </form>
                </div>

           
          </div>
    </div>
</div>   
    }
}

