var express = require('express');
var app = express();
var socketio = require('socket.io');
var http = require('http');
const mongoose = require('mongoose')
var translate = require('yandex-translate')('trnsl.1.1.20200321T011150Z.563510005b0cacad.a7542bd961483bff6ae7ef9b483d4afa341e5697');
const User = require("./models/user.model");

const path = require('path')
var cors = require('cors')
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var apirouter = require('./routes/testAPI');


require('dotenv').config();     
const uri = process.env.MONGODB_URI;
mongoose.connect( uri ||"mongodb://localhost/baby-yoda", {
   useNewUrlParser: true, 
   useCreateIndex: true ,  
   useUnifiedTopology: true }
)
mongoose.connection.on('connected', () => {
  console.log("MongoDB database connection established successfully");
})


const server = http.createServer(app)
const io = socketio(server)
const onlineUsers = []
var onlineUsersInChat = []
var usersandrooms = []


function SendMessage(recipient, sender, message, destination){
  for(var i = 0; i < onlineUsers.length; i++){
    if(recipient === onlineUsers[i].username){
       var msgReciever = onlineUsers[i]
       console.log('=============msgReciever=================')
       console.log(msgReciever)  
      } 
    }
        var sendTo = destination
        io.to(`${msgReciever.id}`).emit(sendTo,{
            "message": message,
            "sender": sender,
            "reciever" :recipient,
      })

}

function SendMessageToRoom(recipient, sender, message, destination, room, socket){
  for(var i = 0; i < onlineUsersInChat.length; i++){
    console.log(onlineUsersInChat[i].id)
    if(recipient === onlineUsersInChat[i].username){
       var msgReciever = onlineUsersInChat[i]
       console.log('=============msgReciever=================')
       console.log(msgReciever)  
      } 
    }
       var string = message
      translate.translate( string, { to: msgReciever.language }, function(err, res) {
        console.log(res.text);
    
        var sendTo = destination
        io.to(`${msgReciever.id}`).emit(sendTo,{
            user: sender,
            textT: res.text,
            text: message,
      })
    })
}

function BroadCastMessageToRoom(recipient, sender, message, destination, room, socket){
  for(var i = 0; i < onlineUsersInChat.length; i++){
    console.log(onlineUsersInChat[i].id)
    if(recipient === onlineUsersInChat[i].username){
       var msgReciever = onlineUsersInChat[i]
       console.log('=============msgReciever=================')
       console.log(msgReciever)  
      } 
    }
       var string = message
      translate.translate( string, { to: msgReciever.language }, function(err, res) {
        console.log(res.text);
    
        var sendTo = destination
        socket.broadcast.emit(sendTo,{
            user: sender,
            textT: res.text,
            text: message,
      })
    })
}


io.on('connection', (socket) => {;  
    // console.log("new connection " + socket.id)  
    socket.on('adduser', (data) =>{
      // console.log(data)
      User.find({username: data.name})
      .then((newuser) =>{
        // console.log(newuser[0].username)
       onlineUsers.push({"username": newuser[0].username, "language": newuser[0].language, "id": socket.id})
       io.emit('userlist', {"username": newuser[0].username, "language": newuser[0].language, "id": socket.id})
      })
      
    })
  
    socket.on('invite', function(data){
    console.log("you have hit the invitation route")
    console.log("---------------------------------------")
     console.log(data)
     SendMessage(data.sender, data.reciever,'you have invited ' + data.reciever + ' to chat','confirminvitation')
     SendMessage(data.reciever, data.sender, data.sender + ' is inviting you to chat', 'sendinvitation')
  });

    socket.on('join', function(data){
      console.log("you have hit the join route")
      console.log("---------------------------------------")
      console.log(data)
      SendMessage(data.reciever, data.sender, 'user accepts your chat', 'invitationAccepted')
      SendMessage(data.sender, data.reciever, 'your chatroom is ready', 'invitationAccepted')    
    })

    socket.on('enterChat', function(data){
      console.log(data.name)

      socket.join(data.room)
      console.log(socket.id)
     
        User.find({username: data.name})
        .then((newuser) =>{
          console.log(newuser[0])
         onlineUsersInChat.push({"username": newuser[0].username, "language": newuser[0].language, "id": socket.id})
         console.log(onlineUsersInChat)
         SendMessageToRoom(data.name, "Admin", " welcome "+ data.name +", to room: " + data.room ,'message', data.room, socket)
         BroadCastMessageToRoom(data.name2, "Admin", data.name + " has joined!" ,'message', data.room, socket)
        //  io.emit('userlist', {"username": newuser[0].username, "language": newuser[0].language, "id": socket.id})
        })
        
    
      // socket.broadcast.to(data.room).emit('message', {user: "admin", textT :data.name + ' has joined!' })
    })

    
    socket.on('sendMessage', (data) =>{
        console.log(data)
        console.log(socket.id)
     SendMessageToRoom(data.reciever, data.sender, data.message,'message', data.room)
     SendMessageToRoom(data.sender, data.sender, data.message,'message', data.room)
    })
  })
    
    // socket.on('disconnect',(socket) =>{
    //     console.log('user has left!')
    //     socket.off()
    // })
// });

app.use('/testAPI', apirouter);

server.listen(PORT, () => console.log('server has started on port' + PORT))

