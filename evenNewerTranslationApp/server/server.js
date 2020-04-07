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
// var onlineUsersInChat = []
var usersandrooms = []


function SendMessage(recipient, sender, message, destination){
  for(var i = 0; i < onlineUsers.length; i++){
    if(recipient === onlineUsers[i].username){
      //  console.log('=============msgReciever=================')
      var msgReciever = onlineUsers[i]
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
       socket.emit('userlist', {"username": newuser[0].username, "language": newuser[0].language, "id": socket.id})
      })    
    })
   
    socket.emit('translateText', {
      'message': 'lets do this once'
    })
    socket.on('groupmsg', function(data){
      console.log(data)
      io.emit('recieveGroupMsg', data)
    })

    socket.on('invite', function(data){
    console.log("you have hit the invitation route")
    console.log("-------------users--------------")
    console.log("---------------data---------------------")
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

    socket.on('joinroom', function(data){
      console.log("you have hit the joinroom route")
      console.log("---------------------------------------")
      console.log(data)
      // SendMessage(data.reciever, data.sender, 'user invites you to join ' + data.room, 'acceptRoom')  
      
            
            for(var i = 0; i < onlineUsers.length; i++){
              if(data.reciever === onlineUsers[i].username){
                //  console.log('=============msgReciever=================')
                var msgReciever = onlineUsers[i]
                console.log(msgReciever)  
                } 
            }
            io.to(`${msgReciever.id}`).emit('acceptRoom',{
                "message": 'user invites you to join ' + data.room,
                "sender": data.sender,
                "reciever" :data.reciever,
                'room': data.room
           })
    })
  
    
    socket.on('EnterChatRoom', function(data) {
      console.log('------EnterChatRoom------')
      console.log(data)
      console.log(data.name)
      User.find({username: data.name})
      .then((newuser) =>{
        // console.log(newuser[0].username)
      console.log(socket.id)
      socket.join(data.room)
      io.in(`${data.room}`).emit('userlist2', onlineUsers)
       })
        function isThisUser(person){
         return person.username === data.name
        }
       var user = onlineUsers.reverse().find(isThisUser)
       user.id = socket.id
       console.log('-----online users----')
       console.log(onlineUsers)
})      
      
socket.on('pvtmsg', function(data){
  console.log('you have hit the pvtmsg route')
  console.log('-------------------------')  
  console.log(data)   
     io.in(`${data.room}`).emit('bob', {
    'user': data.username, 'text': data.message
   })
})

socket.on('agreeToRoom', function(data){
  console.log(data)
})


// socket.on('addNewPersonToRoom', function(data){
//   console.log('you have hit the addpersontoroom route')
//   console.log('---------users--------')  
//   console.log(onlineUsers)
//   console.log('---------data---------')  
//   console.log(data)
//   console.log('---------find chosen user---------')  
//    for (var i = 0; i < onlineUsers.length; i++ ){
//      if(data.reciever ===onlineUsers[i].username){
//        console.log(onlineUsers[i])
//        var chosenuser = onlineUsers[i]
//      }
//    }
//    io.to(`${chosenuser.id}`).emit('invitationFromRoom',{
//      'sender':data.sender,
//      'reciever': data.reciever,
//      'message': data.sender + 'has invited you to join in chat room' + data.room,
//      'room': data.room
//    })

// })
 
// socket.on('joinroom', function(data){
//   console.log('you have hit the joinroom route')
//   console.log('---------users--------') 
//   console.log(data)
//   for (var i = 0; i < onlineUsers.length; i++ ){
//     if(data.reciever ===onlineUsers[i].username){
//       console.log(onlineUsers[i])
//       var chosenuser = onlineUsers[i]
//     }
//   }
//   socket.emit('invitationFromRoom',{
//     'sender':data.sender,
//     'reciever': data.reciever,
//     'message': 'enter chat',
//   })
//   io.to(`${chosenuser.id}`).emit('goToNewRoom',{
//     'sender':data.sender,
//     'reciever': data.reciever,
//     'message': 'user has accepted your chat',
//     'room': data.room
//   })
//  })
})
    

    // socket.on('disconnect',(socket) =>{
    //     console.log('user has left!')
    //     socket.off()
    // })
// });

app.use('/testAPI', apirouter);

server.listen(PORT, () => console.log('server has started on port' + PORT))

