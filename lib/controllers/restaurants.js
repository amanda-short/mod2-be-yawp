const { Router } = require('express');
const Restaurant = require('../models/Restaurant.js');
const { Review } = require('../models/Review.js');
const authenticate = require('../middleware/authenticate');

module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getById(req.params.id);
      await restaurants.addReviews();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })

  .post('/:restId/reviews', authenticate, async (req, res, next) => {
    try {
      const review = await Review.insert({
        restaurant_id: req.params.id,
        user_id: req.user_id,
        detail: req.body.detail,
      });
      res.json(review);  
    } catch (e) {
      next(e);
    }
  });

