var express     = require('express'),
    router      = express.Router(),
    bodyParser  = require('body-parser'),

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

// User route ==============================================
var userRouter = router.route('/user');

userRouter
  .get( function(req, res) {
    User.find( { username : 'yurm04@gmail.com' }, function(err, users) {
      // console.log(users[0]);
      res.json(users);
    } );
  });

module.exports = router;