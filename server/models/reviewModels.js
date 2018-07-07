const mongo = require('mongodb');
const { getDB } = require('../../db/config');

const ReviewModel = {
  get: (id, callback) => {
    const query = {"product_id": Number(id)};
    const db = getDB();
    db.collection('reviews').find(query).toArray((err, res) => {
      console.log(res);
      if (err) callback(err, null);
      callback(null, res);
    });
  },

  getAll: (callback) => {
    const db = getDB();
    db.collection('reviews').find({}).toArray((err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  },

  post: (body, callback) => {
    const db = getDB();
    db.collection('reviews').insertOne(body, (err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  },

  put: (id, body, callback) => {
    const db = getDB();
    (!body) && callback('No data provided - record not updated', null);
    body.updated_at = new Date(Date.now()).toISOString();
    const o_id = new mongo.ObjectID(id);
    db.collection('reviews').updateOne({
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
    db.collection('reviews').deleteOne({
      _id: mongo.ObjectId(id)
    }, (err, res) => {
      if (err) callback(err, null);
      callback(null, res);
    });
  }
}

module.exports = {
  ReviewModel: ReviewModel
}