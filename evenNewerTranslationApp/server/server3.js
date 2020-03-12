var express = require('express');
var path = require('path');

const mongoose = require('mongoose')
var socket = require('socket.io');
var UserName = require('./models/username.model.js');

var indexRouter = require('./routes/api');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

var app = express();
      
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

var server = app.listen(8000, function(){
  console.log('listening for requests on port 8000');
});

var io = socket(server);
io.on('connection', (socket) => {;  
      console.log(socket.id)  
});


