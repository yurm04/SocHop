// event.js ===============================================
var mongoose = require('mongoose'),
    EventLocation = require('./eventLocation');

// create event schema
var eventSchema = new mongoose.Schema({
  owner : mongoose.Schema.Types.ObjectId,    // User ID
  name : String,
  description : { type: String, default: null },
  startTime : Date,
  location: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      zipcode: String,
      coords: {
        lattitude: Number,
        longitude: Number
      }
    }
});


// export model
module.exports = mongoose.model('Event', eventSchema);