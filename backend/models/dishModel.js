const mongoose = require('mongoose');
const {Schema} = mongoose;

// address model
const reviewModelSchema = new Schema({
  // for now String because nickname is stored here
  user_id: String,
  title: String,
  date: String,
  reviewContent: String
})

const dishModelSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
  ratings: {
    type: [Number],
    default: []
  },
  reviews: [reviewModelSchema],
  cuisine: {type: String},
  category: {type: String},
  ingredients: {
    type: [String],
    required: true
  },
  maxAvailable: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrls: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Dish', dishModelSchema);