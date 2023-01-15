const mongoose = require('mongoose');
const {Schema} = mongoose;

//TODO:
// - add review as type in dish model in reviews field
// - create other needed models
// - create REST API for all models
// - connnect REST API to frontend

// create custom schema type
const reviewModel = new Schema({
  userId: {
    type: Number,
    required: true
  },
  dishId: {
    type: Number,
    required: true
  },
  title : {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = {reviewModel};