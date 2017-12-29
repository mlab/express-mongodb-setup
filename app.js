const express = require('express')
const app = express()

const initializeDatabases = require('./dbs')
const routes = require('./routes')

initializeDatabases(function(err, dbs) {
  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(3000, function() {
    console.log('Listening on port 3000')
  })
})

