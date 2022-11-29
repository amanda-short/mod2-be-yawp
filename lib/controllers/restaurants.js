const { Router } = require('express');
const Restaurant = require('../models/Restaurant.js');

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
  });
