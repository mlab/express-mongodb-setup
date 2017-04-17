var express = require('express');
var app = express();

var initializeDatabases = require('./db-connections');
var routes = require('./routes');

initializeDatabases(function(err, dbs) {
  if (err) {
    console.error('Failed to make all database connections!');
    console.error(err);
    process.exit(1);
  }

  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(3000, function() {
    console.log('Listening on port 3000');
  });
});

