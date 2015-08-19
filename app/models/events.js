// event.js ===============================================
var mongoose = require('mongoose'),
    EventLocation = require('./eventLocation');

// create event schema
var eventSchema = new mongoose.Schema({
  host : mongoose.Schema.Types.ObjectId,    // User ID
  name : String,
  description : { type: String, default: null },
  startTime : Date,
  endTime : { type: Date, default: null },
  location : mongoose.Schema.Types.ObjectId,
});


// export model
module.exports = mongoose.model('Event', eventSchema);