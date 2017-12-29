const async = require('async')
const MongoClient = require('mongodb').MongoClient

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const PROD_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"
const MKTG_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"

function createConnection(uri, options, dbName, cb) {
  MongoClient.connect(uri, options, (err, client) => {
    if (err) {
      console.error('Failed to make database connections!');
      console.error(err);
      process.exit(1);
    }

    cb(null, client.db(dbName))
  })
}

let dbs = {
  production: async.apply(createConnection, PROD_URI, {}, 'testa'),
  marketing: async.apply(createConnection, MKTG_URI, {}, 'testb')
}

module.exports = async function(cb) {
  async.parallel(dbs, cb)
}
