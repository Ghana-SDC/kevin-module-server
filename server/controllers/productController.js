const { ProductModel } = require("../models/productModels.js");

const ProductCtrl = {
  get: (req, res) => {
    ProductModel.get(req.params.id, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(200);
    })
  },

  getAll: (req, res) => {
    ProductModel.getAll((err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(200);
    })
  },

  post: (req, res) => {
    ProductModel.post(req.params.name, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(201);
    })
  },

  put: (req, res) => {
    let body = {
      id: req.params.id,
      name: req.body.name
    }
    ProductModel.put(body, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(201);
    })
  },

  delete: (req, res) => {
    ProductModel.delete(req.params.id, (err, data) => {
      (err) && res.send(err).status(400);
      res.send(data).status(200);
    })
  }
};

module.exports = {
  ProductCtrl : ProductCtrl
};

