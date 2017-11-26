var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

var config = {
  database: 'to_do_list', // name of database
  host: 'localhost', // where is your database (which computer)
  port: 5432, // port number for database
  max: 10, // how many connections at one time
  idleTimeoutMillies: 30000 // 30 seconds to try to connect to database
};

var pool = new pg.Pool(config);







// Start listening for requests on a specific port
app.listen(port, function(){
    console.log('listening on port', port);
  });