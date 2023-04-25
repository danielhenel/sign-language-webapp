/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Dish){
  const dishRouter = express.Router();
  // Get all dishes: /api/dishes
  dishRouter.route('/dishes')
    // post new dish
    .post ((req, res) => {
      const dish = new Dish(req.body);
      // save dish to database
      dish.save();
      return res.status(201).json(dish);
    })
    // get all dishes
    .get((req, res) => {
      Dish.find((err, dishes) => {
        if (err) {
          return res.send(err);
        }
        return res.json(dishes);
      })
    });

  // Filter by any field, f.e. in this case by cuisine: /api/dishes?cuisine=italian
  dishRouter.route('/dishesFilter')
    .get((req, res) => {
      const { query } = req;
      if(req.query.cuisine) {
        query.cuisine = req.query.cuisine;
      }
      console.log(query);
      Dish.find(query, (err, dishes) => {
        if (err) {
          return res.send(err);
        }
        return res.json(dishes);
      })
    });

  // middleware
  dishRouter.use('/dishes/:dishId', (req, res, next) => {
    Dish.findOne({id: req.params.dishId}, (err, dish) => {
      if (err) {
        return res.send(err);
      }
      if (dish) {
        req.dish = dish;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  //Get dish by my 'custom' id: /api/dishes/2
  dishRouter.route('/dishes/:dishId')
    .get((req, res) => res.json(req.dish))
    // update dish (replace with new one) # works fine
    .put((req, res) => {
        const { dish } = req;
        dish.id = req.body.id;
        dish.name = req.body.name;
        dish.ratings = req.body.ratings;
        dish.reviews = req.body.reviews;
        dish.cuisine = req.body.cuisine;
        dish.category = req.body.category;
        dish.ingredients = req.body.ingredients;
        dish.maxAvailable = req.body.maxAvailable;
        dish.price = req.body.price;
        dish.description = req.body.description;
        dish.imageUrls = req.body.imageUrls;
        req.dish.save((err) => {
          if(err) {
            return res.send(err);
          }
          return res.json(dish);
        });
    })
    // update dish (update only some fields) # works fine
    .patch((req, res) => {
      const { dish } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      if (req.body.id) {
        delete req.body.id;
      }
       Object.entries(req.body).forEach((item) => {
          const key = item[0];
          const value = item[1];
          dish[key] = value;
       });
        req.dish.save((err) => {
          if(err) {
            return res.send(err);
          }
          return res.json(dish);
        });
    })
    .delete((req, res) => {
      req.dish.remove((err) => {
        if (err) {
          return res.send(err);
        }
        // send status 204 - removed (no content)
        return res.sendStatus(204);
      });
    });
  return dishRouter;
}

module.exports = routes;