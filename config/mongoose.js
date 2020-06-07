const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => console.error('connection error!'));
db.once('open', () => console.log('database connected'));

module.exports = db;
