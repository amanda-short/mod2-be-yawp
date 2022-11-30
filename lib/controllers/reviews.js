const { Router } = require('express');
const { Review } = require('../models/Review.js');
const authenticate = require('../middleware/authenticate.js');
const reviewMid = require('../middleware/review.middleware.js');

module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.getById(req.params.id);
      if (!review) {
        next();
      }
      res.json(review);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authenticate, reviewMid, async (req, res, next) => {
    try {
      const deleteReview = await Review.deleteById(req.params.id);
      res.json(deleteReview);
    } catch (e) {
      next(e);
    }
  });
