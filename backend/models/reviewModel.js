const mongoose = require('mongoose');
const {Schema} = mongoose;

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