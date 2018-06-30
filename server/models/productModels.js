const mongo = require('mongodb');
const { getDB } = require('../../db/config');

const ProductModel = {
  get: (id, callback) => {
    const db = getDB();
    const o_id = new mongo.ObjectID(id);
    db.collection('products').findOne({ _id: o_id }, (err, res) => {
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
    const o_id = new mongo.ObjectID(_id)
    body.updated_at = new Date(Date.now()).toISOString()
    db.collection('products').updateOne({
      _id: o_id
    },{
      $set: body
    }, (err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  },

  delete: (id, callback) => {
    const db = getDB();
    db.collection('products').deleteOne({
      _id: mongo.ObjectId(id)
    }, (err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  }
}

module.exports = {
  ProductModel: ProductModel
}