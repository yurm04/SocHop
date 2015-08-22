// Script to add  in dummy data
var mongoose = require('mongoose'),
    dbhost = 'mongodb://127.0.0.1:27017/sochop',

// Models    
    User = require('./app/models/user'),
    Event = require('./app/models/events');


mongoose.connect(dbhost);

// Checking connection to db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(callback) {
  console.log('successfully connected to DB');
});

// Dummy data
var users = [
  { username: 'yuraima@bu.edu', password: 'password' },
  { username: 'john@bu.edu', password: 'password' },
  { username: 'instructor@bu.edu', password: 'password' }
];

// One sapmle event, need to either create more events with coordinates close to you or
// use the create form after you sign in
var events = [
  {
    owner: '',
    name: 'event1',
    description: 'Test event 1',
    startTime : Date.now(),
    location: {
      address1: '29 E. 129th St',
      address2: '',
      state: 'NY',
      coords: {
        latitude: 80.8933333,
        longitude: -75.453000
      }
    }
  }
];

var user;
var userIds = [];
var usersCreated = false;
// Create the 3 users
var createUsers = function() {
      for (var i = 0; i < users.length; i++) {
        user = new User(users[i]);
        user.save(saveCallback);
      }
    },

    saveCallback = function (err, doc) {
      if (err) console.log('Error occured on save: ' + err);
      
      if (usersCreated === false) {
         usersCreated = true;
         for (var i = 0; i < doc.length; i++) {
          console.log(doc._id); throw new error('');
           userIds.push(doc._id);
         }
      }

      console.log('created document: ' + doc._id);
    },

    createEvents = function() {
      for (var i = 0; i < events.length; i++) {
        var curEvent = new Event(events[i]);
        // console.log(userIds); throw new error();
        events[i].owner = mongoose.Types.ObjectId(userIds[i]);
        curEvent.save(saveCallback);
      }
    },

    setUpData = function() {
      createUsers();
      createEvents();
    };

setUpData();