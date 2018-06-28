const { MongoClient, url } = require("../../db/config/index.js");
const mongo = require('mongodb');

const ReviewModel = {
  get: (id, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      let query = {"productId": Number(id)};
      db.db('reviews').collection('reviews').find(query).toArray((err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    }); 
  },

  getAll: (callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('reviews').find({}).toArray((err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    }); 
  },

  post: (body, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('reviews').insertOne(body, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    });
  },

  put: (id, body, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      (!body) && callback('No data provided - record not updated', null);
      body.updatedAt = new Date(Date.now()).toISOString();
      const o_id = new mongo.ObjectID(id);
      db.db('reviews').collection('reviews').updateOne({
        _id: o_id
      },{
        $set: body
      }, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    });
  },

  delete: (id, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('reviews').deleteOne({
        _id: mongo.ObjectId(id)
      }, (err, res) => {
        if (err) callback(err, null);
        callback(null, res);
      });
    });
  }
}

module.exports = {
  ReviewModel: ReviewModel
}