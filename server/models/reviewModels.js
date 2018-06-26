const { MongoClient, url } = require("../../db/config/index.js");
const mongo = require('mongodb');

const ReviewModel = {
  get: (id, callback) => {
    const o_id = new mongo.ObjectID(id);
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db('reviews').collection('reviews').findOne({ _id: o_id }, (err, res) => {
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
    db.query(`
      DELETE FROM reviews WHERE id=${id}
    `)
    .spread((data) => {
      console.log('delete review successful');
      callback(null, data[1]);
    })
    .catch(err => {
      console.log('error with deleting review,', err);
      callback(err, null);
    });
  }

  
}

module.exports = {
  ReviewModel: ReviewModel
}