const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserNameSchema = new Schema({
  username: String,
  socketID: String,
});

const UserName = mongoose.model("UserName", UserNameSchema);

module.exports = UserName;
