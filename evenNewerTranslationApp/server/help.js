
// module.exports = function add(one, two){
//  return one + two;
// }


module.exports = function SendMessage(recipient, message, destination){
    for(var i = 0; i < onlineUsers.length; i++){
      if(recipient === onlineUsers[i].username){
         var msgSender = onlineUsers[i]
         console.log(onlineUsers[i].username)  
        } 
      }
         var string = message
        translate.translate( string, { to: msgSender.language }, function(err, res) {
          console.log(res.text);
      
          var sendTo = destination
          io.to(`${msgSender.id}`).emit(sendTo,{
              "message": res.text,
              "sender": 'admin',
              "reciever" :recipient,
  
        })
      })
  }

