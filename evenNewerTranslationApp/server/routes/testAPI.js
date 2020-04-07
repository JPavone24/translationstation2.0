var express = require('express');
var router = express.Router();
const User = require("../models/user.model.js");
const Username = require("../models/username.model.js");
const mongoose = require('mongoose')



var onlineUsers = []

router.get('/', function(req, res, next) {
  // console.log("you have hit the test api route")
    User.find({})
    .then((data) =>{
        res.json(data)
    })
    .catch((error)=>{
        console.log('error: ', error)
    })
});


router.post("/", function(req, res) {
  console.log(req.body);
  const userInput = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password:req.body.password,
    language:req.body.language,
  })
  userInput.save()  
  .then(result =>{
      console.log(result)
})
res.send(req.body)
});


router.get("/user", function(req, res) {
  // console.log('you have hit the users route')
    res.json(onlineUsers)
});

router.post("/user", function(req, res) {
    console.log('-----------------------------------------------------------');
    console.log("you are at the test api user-route : " + req.body.username)
    console.log('------------------------------------------------------------');
    
    User.find({username: req.body.username})
    .then((data) =>{
      onlineUsers.push({"username": data[0].username, "language":data[0].language })
      res.send({"username": data[0].username, "language":data[0].language })
    })
    .catch((error)=>{
        console.log('error: ', error)
        res.send("error user not found")
    })
  }); 

  router.get("/user/:name", function(req, res) {
    console.log(req.params.name)
    User.find({username: req.params.name})
    .then((data) =>{
      res.send({"language":data[0].language })
    })
    .catch((error)=>{
        console.log('error: ', error)
        res.send("error user not found")
    })
  });
  

module.exports = router;