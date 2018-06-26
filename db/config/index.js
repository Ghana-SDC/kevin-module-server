const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/reviews";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("created reviews db");
  db.db('reviews').createCollection("products", function(err, res) {
    if (err) throw err;
    console.log("created products collection");

    db.db('reviews').createCollection("reviews", function(err, res) {
      if (err) throw err;
      console.log("created reviews collection");
      db.close();
    });

  });
});

module.exports = {
  MongoClient,
  url
}