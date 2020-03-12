var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var  userFunction = require('./users');
// console.log(userFunction)
// const {addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 5000;
var apirouter = require('./routes/api');

var app = express();
const server = http.createServer(app)
const io = socketio(server)
const users = []



io.on('connection', (socket) => {;  
    console.log("new connection" + socket.id)  
    
  
    socket.on('join', ({name, room}, callback) =>{
      var name = name.trim().toLowerCase()
      var room = room.trim().toLowerCase()
        var user = {
            name: name,
            room: room,
            id: socket.id
        }
        console.log(user)
        // const existingingUser = users.find((user) => user.name === name)
        // if(existingingUser){
        //     console.log("username is taken")
        // }
        // else{
        //     console.log("username is free")
            users.push(user)
            socket.join(user.room); 
            socket.emit('message', {user:'admin', text: `${user.name}, welcome to the ${user.room}` })
            socket.broadcast.to(user.room).emit('message', {user: "admin", text:`${user.name}has joined!` })
    });

    socket.on('sendMessage', (message) =>{

        const getUser= (id) =>{ users.find(function(user){
            if(user.id === id){
            io.to(user.room).emit('message', {user: user.name, text: message})
            }
         })
        }
        getUser(socket.id)
    })
    
    // socket.on('disconnect',(socket) =>{
    //     console.log('user has left!')
    //     socket.off()
    // })
});

app.use(apirouter)
server.listen(PORT, () => console.log('server has started on port' + PORT))

