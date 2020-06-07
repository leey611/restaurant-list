const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => console.error('connection error!'));
db.once('open', () => console.log('database connected'));

module.exports = db;
