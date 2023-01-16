const express = require('express');
const mongoose = require('mongoose');
// Connect to MongoDB

const database = require('./database');
const bodyParser = require('body-parser');
// body-parser used to POST data
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
express.Router();
const port = process.env.PORT || 3000;


const Dish = require('./models/dishModel');
const dishRouter = require('./routes/dishRouter')(Dish);
const Order = require('./models/orderModel');
const orderRouter = require('./routes/orderRouter')(Order);
const User = require('./models/userModel');
const userRouter = require('./routes/userRouter')(User);


app.use('/api', dishRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);


// TODO:
//  - create table for Users + CRUD
//  - integrate it with frontend + create login/register (maybe he put instructions about that)


// req -> request
// res -> response
app.get('/', (req, res) => {
  res.send('RESTAURANT API');
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
