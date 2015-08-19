// user.js ================================================

// load mongoose package
var mongoose = require('mongoose');

// User data schema definition
var userSchema = new mongoose.Schema( {
  username : String,
  password : String,
  token    : String
});

// Export model
module.exports = mongoose.model('User', userSchema);