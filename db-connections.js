var MongoClient = require('mongodb').MongoClient;

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
var PROD_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>&ssl=true";
var MKTG_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>&ssl=true";

var databases = {
  production: function(cb) { MongoClient.connect(PROD_URI, cb) },
  marketing: function(cb) { MongoClient.connect(MKTG_URI, cb) }
};

module.exports = function (cb) {
  databases.production(function(prodErr, production) {
    databases.marketing(function(markErr, marketing) {
      cb(prodErr || markErr, {
        production: production,
        marketing: marketing
      });
    });
  });
};
