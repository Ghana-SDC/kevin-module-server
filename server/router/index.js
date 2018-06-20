const Router = require('express').Router();
const { ReviewCtrl } = require('../controllers/reviewController.js');

Router.route('/reviews/:search').get(ReviewCtrl.getById);
Router.route('/reviews/product/:name').get(ReviewCtrl.getByName);  

module.exports = {
  Router
};
