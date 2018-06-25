const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/reviews";

const database;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("created reviews db");
  database = db.db('reviews');
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
  database
}