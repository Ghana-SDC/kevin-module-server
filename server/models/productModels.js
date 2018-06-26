const { MongoClient, url } = require("../../db/config/index.js");
const mongo = require('mongodb');

const ProductModel = {
  get: (id, callback) => {
    const o_id = new mongo.ObjectID(id);
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('products').findOne({ _id: o_id }, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    }); 
  },

  getAll: (callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('products').find({}).toArray((err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    }); 
  },

  post: (name, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('products').insertOne({
        name: name,
        updatedAt: new Date(Date.now()).toISOString()
      }, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    });
  },

  // put: (body, callback) => {
  //   if (body.name) {
  //     db.query(`UPDATE products SET name='${body.name}', "updatedAt" = NOW() WHERE id=${body.id};`)    
  //     .spread((data) => {
  //       console.log('update review successful');
  //       callback(null, 'product updated');
  //     })
  //     .catch(err => {
  //       console.log('error with updating review,', err);
  //       callback(err, null);
  //     });
  //   } else {
  //     callback(null, 'did not update');
  //   }

  // },

  // delete: (id, callback) => {
  //   db.query(`
  //     DELETE FROM products WHERE id=${id}
  //   `)
  //   .spread((data) => {
  //     console.log('delete product successful');
  //     callback(null, data[1]);
  //   })
  //   .catch(err => {
  //     console.log('error with deleting product,', err);
  //     callback(err, null);
  //   });
  // }
}

module.exports = {
  ProductModel: ProductModel
}