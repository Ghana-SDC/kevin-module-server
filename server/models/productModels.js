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

  put: (body, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      const o_id = new mongo.ObjectID(body.id)
      db.db('reviews').collection('products').updateOne({
        _id: o_id
      },{
        $set: {
          name: body.name,
          updatedAt: new Date(Date.now()).toISOString()
        }
      }, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    });

  },

  delete: (id, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('products').deleteOne({
        _id: mongo.ObjectId(id)
      }, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    });
  }
}

module.exports = {
  ProductModel: ProductModel
}