const { ReviewModel } = require("../models/reviewModels.js")

const ReviewCtrl = {
  get: (req, res) => {
    let params = { productId: req.params.search };
    ReviewModel.get(params, (err, data) => {
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
      productId: Number(req.body.productId),
      verified:  req.body.verified === 'true' ? true : false
    };
    ReviewModel.post(body, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(201);
    })
  },

  put: (req, res) => {
    let body = { 
      id: req.params.id, 
      customer_name: req.body.customer_name,
      rating: req.body.rating,
      date: req.body.date,
      title: req.body.title,
      review: req.body.review,
      helpful_count: req.body.helpful_count,
      productId: req.body.productId,
      verified: req.body.verified ? (req.body.verified === 'true' ? true : false) : undefined
    };
    ReviewModel.put (body, (err, data) => {
      console.log(data);
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