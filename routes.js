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

  return app;
};