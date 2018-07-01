const mongo = require('mongodb');
const { getDB } = require('../../db/config');

const ProductModel = {
  get: (_id, callback) => {
    const db = getDB();
    db.collection('products').findOne({ _id: _id }, (err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  },

  getAll: (callback) => {
    const db = getDB();
    db.collection('products').find({}).toArray((err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  },

  post: (name, callback) => {
    const db = getDB();
    db.collection('counter').findOneAndUpdate({}, { $inc: { "count": 1 } } , (err, res) => {
      if (err) {
        callback(err, null);
      }
      let count = res.value.count;
      db.collection('products').insertOne({
        id: count,
        name: name,
        updated_at: new Date(Date.now()).toISOString()
      }, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    })
  },

  put: (_id, body, callback) => {
    const db = getDB();
    body.updated_at = new Date(Date.now()).toISOString()
    db.collection('products').updateOne({
      _id: _id
    },{
      $set: body
    }, (err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  },

  delete: (_id, callback) => {
    const db = getDB();
    db.collection('products').deleteOne({
      _id: _id
    }, (err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  }
}

module.exports = {
  ProductModel: ProductModel
}