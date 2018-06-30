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

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const mongoDB = 'mongodb://127.0.0.1/reviews';

// mongoose.connect(mongoDB, () => console.log('connected to reviews db'));

// const productSchema = new Schema({
//   id: Number,
//   name: String
// }, {
//   versionKey: false
// });

// const reviewSchema = new Schema({
//   customer_name: String,
//   rating: Number,
//   title: String,
//   date: String,
//   review: String,
//   helpful_count: Number,
//   verified: Boolean,
//   product_id: Number
// }, {
//   versionKey: false
// });

// const counterSchema = new Schema({
//   count: {type: Number, default: 10000000}
// },{
//   versionKey: false
// });

// const Counter = mongoose.model('Counter', counterSchema);
  
//   // , function(err, res) {
//   //   if (err) {
//   //     return next(err);
//   //   }
//   //   console.log(res);
    
//   //   next();
//   //   // doc.id = counter.count;
//   //   // next();
//   // });


// const Product = mongoose.model('Product', productSchema);
// const Review = mongoose.model('Review', reviewSchema);


// // productSchema.pre('save', function(next) {
// //   var doc = this;
// //   Counter.find()
// //   .then(function(res) {
// //     console.log(res)
// //   })
// // })

// const save = (model, callback) => {
//   if (model.message === 'Not Found') {
//     callback(model, null);
//   }
//   console.log('document saved');
// }

// module.exports = {
//   Product: Product,
//   Review: Review,
//   Counter: Counter,
//   save: save
// }