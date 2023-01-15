const express = require('express');
const mongoose = require('mongoose');
// Connect to MongoDB

const database = require('./database');
const bodyParser = require('body-parser');
// body-parser used to POST data
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const restaurantRouter = express.Router();
const port = process.env.PORT || 3000;
const Dish = require('./models/dishModel');

app.use('/api', restaurantRouter);

// TODO:
//  - create table for Users + CRUD
//  - integrate it with frontend + create login/register (maybe he put instructions about that)

// Get all dishes: /api/dishes
restaurantRouter.route('/dishes')
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
restaurantRouter.route('/dishesFilter')
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

//Get dish by 'my custom' id: /api/dishes/2
restaurantRouter.route('/dishes/:id')
  .get((req, res) => {
    Dish.find({id: req.params.id}, (err, dish) => {
      if (err) {
        return res.send(err);
      }
      return res.json(dish);
    })
  });

// req -> request
// res -> response
app.get('/', (req, res) => {
  res.send('RESTAURANT API');
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
