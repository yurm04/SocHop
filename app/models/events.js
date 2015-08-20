// event.js ===============================================
var mongoose = require('mongoose'),
    EventLocation = require('./eventLocation');

// create event schema
var eventSchema = new mongoose.Schema({
  host : mongoose.Schema.Types.ObjectId,    // User ID
  name : String,
  description : { type: String, default: null },
  startTime : Date,
  location : { lattitude: Number, longitude: Number },
});


// export model
module.exports = mongoose.model('Event', eventSchema);