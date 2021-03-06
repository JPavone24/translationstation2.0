const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: String,
  email: { type: String, },
  // password: { type: String,},
  language: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
