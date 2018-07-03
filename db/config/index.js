const { MongoClient } = require('mongodb');
// const url = "mongodb://localhost:27017/reviews";
const url = "mongodb://mongo:27017/reviews";
let _db;

MongoClient.connect(url, { poolSize: 20}, function(err, client) {
  if (err) throw err;
  _db = client.db('reviews');
  client.db('reviews').createCollection("products", function(err, res) {
    if (err) throw err;
    client.db('reviews').collection("products").createIndex({id: 1}, function(err, res) {
      if (err) throw err
    })
    client.db('reviews').createCollection("reviews", function(err, res) {
      if (err) throw err;
      client.db('reviews').collection("reviews").createIndex({product_id: 1}, function(err, res) {
        if (err) throw err
      })
      client.db('reviews').createCollection("counter", function(err, res) {
        if (err) throw err;
        console.log('completed db sync')
      });
    });
  });
});

function getDB() {
  return _db;
}
  
module.exports = {
  getDB
}