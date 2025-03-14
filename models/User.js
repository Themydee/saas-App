const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
