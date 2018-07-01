const { ReviewModel } = require("../models/reviewModels.js")

const ReviewCtrl = {
  get: (req, res) => {
    ReviewModel.get(req.params.id , (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(200);
    })
  },

  getAll: (req, res) => {
    ReviewModel.getAll((err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(200);
    })
  },

  post: (req, res) => {
    let body = { 
      customer_name: req.body.customer_name || 'Amazon Customer',
      rating: Number(req.body.rating),
      title: req.body.title,
      review: req.body.review,
      helpful_count: Number(req.body.helpful_count),
      product_id: Number(req.body.productId),
      verified:  req.body.verified === 'true' ? true : false,
      updated_at: new Date(Date.now()).toISOString()
    };
    ReviewModel.post(body, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(201);
    })
  },

  put: (req, res) => {
    let id =  req.params.id;
    let body = {};
    (req.body.customer_name) && (body.customer_name = req.body.customer_name);
    (req.body.rating) && (body.rating = req.body.rating);
    (req.body.date) && (body.date = req.body.date);
    (req.body.title) && (body.title = req.body.title);
    (req.body.review) && (body.review = req.body.review);
    (req.body.helpful_count) && (body.helpful_count = req.body.helpful_count);
    (req.body.productId) && (body.productId = req.body.productId);
    (req.body.verified) && (body.verified = req.body.verified);
    ReviewModel.put (id, body, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(200);
    })
  },

  delete: (req, res) => {
    ReviewModel.delete(req.params.id, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(200);
    })
  }
};

module.exports = {
  ReviewCtrl: ReviewCtrl
};