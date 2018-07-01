const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/reviews";

let _db;

MongoClient.connect(url, { poolSize: 10}, function(err, client) {
  if (err) throw err;
  console.log("created reviews db");
  _db = client.db('reviews');
  client.db('reviews').createCollection("products", function(err, res) {
    if (err) throw err;
    console.log("created products collection");
    client.db('reviews').createCollection("reviews", function(err, res) {
      if (err) throw err;
      console.log("created reviews collection");
    });
  });
});

function getDB() {
  return _db;
}
  
module.exports = {
  getDB
}