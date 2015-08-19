// eventLocation.js =======================================
var mongoose = require('mongoose');

// creat eventLocation Schema
var eventLocationSchema = new mongoose.Schema({
  eventId : mongoose.Schema.Types.ObjectId,
  name : String,
  description : String,
  coords : { latitude : Number, longitude : Number }
});

module.exports = mongoose.model('EventLocation', eventLocationSchema);