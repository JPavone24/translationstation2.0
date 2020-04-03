import React from "react"; 
import axios from "axios";
import queryString from 'query-string';
import io from "socket.io-client";
import Navbar from "../Navbar/Navbar";
import "./Chat.css";

var key = 'trnsl.1.1.20200321T011150Z.563510005b0cacad.a7542bd961483bff6ae7ef9b483d4afa341e5697'
var translate = require('yandex-translate')(key);


let socket;
const ENDPOINT = 'localhost:5000'

var users = []
var messagearray  = []
var messagearray2 = []
var messagearray3 = []
const parsed = queryString.parse(window.location.search);
var name = parsed.name
var room = parsed.room
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
  console.log('translate function working')
  console.log(users[0])
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
    message: ''
  };
          this.handleChange = event => {
            console.log(event.target.name)
            this.setState({[event.target.id]: event.target.value });
          }
          this.handleSubmit = event => {
            event.preventDefault()
            console.log(this.state.message)
            socket.emit('pvtmsg' ,{
              'username':name, 'message':this.state.message, 'room': room
            })
          }
    
          this.handleClick = (event) => {
            console.log('===================HANDLECLICK EVENT=======================')
            var clickedUser = event.target.dataset.value
            msgReciever = clickedUser
            console.log(msgReciever)
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
          this.InviteToRoom = (event) => {
            console.log('=========invite to room=========')
              var accept = event.target.dataset.value
              console.log(msgReciever)
              socket.emit('joinroom', {"response": accept, "sender":name, "reciever": msgReciever, 'room': room}, () => {
              })
              
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
              socket.emit('EnterChatRoom',{name, room})
         window.open("/chat?name=" + name + '&&name2=' + msgReciever + '&&room=' + room)
      }
      this.NewPtvChat = (event) => {
        console.log('====================GO TO CHAT======================')
        // console.log("go to room 101")
        console.log(name)
        console.log(msgReciever)
      //    var nameArray = []
      //       nameArray.push(name)
      //       nameArray.push(msgReciever)
      //       nameArray.sort()
      //       console.log(nameArray)
      //       var room = nameArray[0] + nameArray[1]
      //       socket.emit('EnterChatRoom',{name, room})
      //  var address = "/chat?name=" + name + '&&name2=' + msgReciever + '&&room=' + room
      //  window.open(address)
    }
}

componentDidMount(){
  socket = io(ENDPOINT)
  axios.get('http://localhost:5000/testapi/user')
  .then(res => {
    // console.log(res.data)
    this.setState({persons: res.data})
    
  })
  socket.emit('EnterChatRoom',{name, room})

  socket.on('recieveGroupMsg', function(data){
    console.log(data)
    // TranslateMessage(data.message, data.username, messagearray3)
 })
 socket.on('userlist2', function(data){
  console.log('-----userlist----')
  console.log(data)
 users = data
  console.log('==========================================')
})
 socket.on('bob', function(data){
  console.log('you have hit the pvtmsg route')
  console.log('-------------------------')  
  console.log(data)
  TranslateMessage(data.text, data.user, messagearray3)
})

  socket.on('sendinvitation', function(data){
    console.log('============SEND INVITATION============')
    console.log(data.message)
    TranslateBtn('accept', acceptBtn)
    TranslateMessage(data.message, 'admin', messagearray)
    msgReciever = data.sender
  })


    socket.on('acceptRoom', function(data){
      console.log(data)
    })


  socket.on('confirminvitation', function(data){
    console.log('============CONFIRM INVITATION============')
    console.log(data)
    TranslateEnterBtn('enter chat')
    TranslateMessage(data.message, 'admin', messagearray3)
  })

   
  socket.on('invitationAccepted', function(data){
    console.log('===========INVITATION ACCEPTED==============')
    console.log(data)
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
        return(
          <div>
          <Navbar />
          <div className = 'container'>
          <h1 id = 'heading' className = 'text-center'> Private Chat</h1>
           <div className = "row"  id = "chat-form">

              <div id = "names" className = "col-lg-4">
                      <h3 id = "name-greeting" className = 'text-center'>Welcome {name}</h3>
                      <div id = 'online-users-list'>
                          <h5 className = 'text-center'> Click on username for a new private chat or to invite user into this conversation</h5>
                          {this.state.persons.map((user, i )=> <li  key = {i}><span  data-value = {user.username}onClick = {(event) => this.handleClick(event)}>{user.username}</span> <b>({user.language})</b></li>)} 
                      </div>
              </div>

               <div className = "col-lg-8" id = 'message-box'>
                  <h1 className = 'text-center'> Chat with just this user</h1>
                    <div id = "messages">   
                        {messagearray3.map((message, i )=> <div><span><b>{message.user}: </b>{message.text}</span></div>)}
                        {messagearray.map((message, i )=> <div><span><b> {message.user} </b>{message.text}</span> <button data-value = "accept" onClick = {(event) => this.AcceptMessage(event)}>{acceptBtn}</button></div>)}
                        {messagearray2.map((message, i )=> <div><span><b>{message.user} </b>{message.text}</span><button data-value = "getaRoom" onClick = {(event) => this.goToChat(event)}>{enterChat}</button></div>)}
                    </div>
                    <form>
                      <div className = 'row' id = 'input'>
                          <div class = 'col-lg-9'>
                              <input className = "h-100 w-100" type="text" id="message" onChange={this.handleChange}/>
                          </div>
                          <div class = 'col-lg-3'>
                              <button className = "btn btn-primary w-100" id = 'button1' onClick={this.handleSubmit}>Add</button> 
                          </div> 
                      </div>
                    </form>
                </div>
      

            </div>
              
          </div>
    </div>  
        ) 
    }
}

