const mongoose = require('mongoose');
const {Schema} = mongoose;


const orderEntrySchema = new Schema({
  dishId: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// create custom schema type
const orderModelSchema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  dishes: {
    type: [orderEntrySchema],
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderModelSchema);