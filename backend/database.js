let mongoose = require('mongoose');
const {secrets} = require("./secrets");

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.set("strictQuery", false);
    mongoose.connect(secrets.mongoUri)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error:' + err)
      })
  }
}

module.exports = new Database()