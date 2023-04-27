const mongoose = require('mongoose');
const {Schema} = mongoose;


const recordModelSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Record', recordModelSchema);