var express = require('express'),
    app     = express();
    api     = require('./api');

app
  .use(express.static('./public'))      // Publically serves any files insid of the public directory
  .use('/api', api)                    // Prefixes all routes in api objext with '/api'
  .get('*', function(req, res) {        // Any request that comes in will be set the main.html file
    res.sendfile('public/main.html');   // Set to main.html instead of index.html because any time a req to / comes in that is interpretted as index.html, this avoids confusion
  })
  .listen(3000);                   // Listening on port 3000
