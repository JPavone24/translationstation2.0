var express = require('express');
var router = express.Router();
const User = require("../models/user.model.js");
const mongoose = require('mongoose')

var onlineUsers = []

router.get('/', function(req, res, next) {
    User.find({})
    .then((data) =>{
        console.log('data: ', data)
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


router.get("/:user", function(req, res) {
  console.log(req.params.user)
  User.find({email:req.params.user })
  .then((data) =>{
      console.log("user found")
      res.send(data)
  })
  .catch((error)=>{
      console.log('error: ', error)
  })
});

router.post("/:user", function(req, res) {
    console.log(req.body.email);
    res.send(req.body.email)
  });


module.exports = router;