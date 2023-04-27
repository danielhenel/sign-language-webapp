const express = require('express');
const mongoose = require('mongoose');
// Connect to MongoDB

const database = require('./database');
const AImodel = require('./AImodel');
const bodyParser = require('body-parser');
// body-parser used to POST data
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
express.Router();
const port = process.env.PORT || 3000;


const Record = require('./models/recordModel');
const recordRouter = require('./routes/recordRouter')(Record);
const User = require('./models/userModel');
const userRouter = require('./routes/userRouter')(User);


app.use('/api', recordRouter);
app.use('/api', userRouter);


// sign language app
const detectionRouter = require('./routes/detectionRouter')();
app.use('/api', detectionRouter);


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

// app.get('/api/detection', (req, res) => {
//   res.send({"detected": "G"});
// })