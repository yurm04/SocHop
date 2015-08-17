// user.js ================================================

// load mongoose package
var mongoos = require('mongoose');

// User data schema definition
var userSchema = new mongoose.Schema( {
  username : String,
  password : String
});

// Export model
module.exports = mongoose.model('User', UserSchema);