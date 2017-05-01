var async = require('async');

module.exports = function(app, dbs) {

  app.get('/production', function(req, res) {
    dbs.production.collection('test').find({}).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs);
      }
    });
  });

  app.get('/marketing', function(req, res) {
    dbs.marketing.collection('test').find({}).toArray(function (err, docs) {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs);
      }
    });
  });

  app.get('/timesensitive', function(req, res) {
    var q = dbs.production.collection('test').find({});
    var query = async.timeout(function(cb) { q.toArray(cb) }, 5000);
    query(function (err, docs) {
      if (err && err.code == 'ETIMEDOUT') {
        res.status(503).end();
      } else if (err) {
        res.error(err);
      } else {
        res.json(docs);
      }
    });
  });

  return app;
};
