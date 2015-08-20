var express     = require('express'),
    router      = express.Router(),
    bodyParser  = require('body-parser'),
    jwt         = require('jsonwebtoken'),    // web token module
    // DB stuff
    mongoose    = require('mongoose'),
    dbhost      = 'mongodb://127.0.0.1:27017/sochop',

    // User model
    User = require('./app/models/user');

// Connecting to DB
mongoose.connect(dbhost);

// Handling error or success once connected to DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(callback) {
  console.log('successfully connected to DB');
});

// ROUTER =================================================
router
  .use(bodyParser.json())
  .route('/')
    .get(function (req, res) {
      res.json( { message: 'Hello API!'} );
    });

// signin route ====================================
var signinRouter = router.route('/signin');

signinRouter.post(function(req, res) {
  User.findOne( { username: req.body.username, password: req.body.password }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured:" + err
      });
      console.log("Sign in error: " + err);
    } else {
      if (user) {
        // If user exists, return user data
        Event.find( { _id: user._id }, function (err, events) {
          // add events to user response
          user.events = events;
          res.json({
            type: true,
            data: user,
          });
        });
      } else {
        // If no match found, return error
        res.json({
          type: false,
          data: "Incorrect email/password"
        });
      }
    }
  });

});

// Signup route ============================================
var signupRoute = router.route('/signup');

signupRoute.post(function(req, res) {
  User.findOne( { username: req.body.username, password: req.body.password }, function(err, user){
    if (err) {
      res.json({
        type: false,
        data: "Error occured:" + err
      });
      console.log("Authentication error: " + err);
    } else {
      if (user) {
        // If user exists, return error
        res.json({
          type: false,
          data: 'Error Occured: ' + err
        });
      } else {
        // create new user and save
        var userModel = new User();
        userModel.username = req.body.username;
        userModel.password = req.body.password;
        userModel.save( function(err, user) {
          // respond with the user data and success
          res.json({
            type: true,
            data: user
          });
        });
      }
    }
  });
});

// User route ==============================================
var userRouter = router.route('/user');

userRouter
  .get( function(req, res) {
    User.find( { username : 'yurm04@gmail.com' }, function(err, users) {
      // console.log(users[0]);
      res.json(users);
    } );
  });

// Events route ===========================================
var eventsRouter = router.route('/event');

eventsRouter
  .get( function(req, res) {
    Event.find(function() {
      res.json(events);
    });
  });
module.exports = router;