const express = require('express');
const router = express.Router();
const restaurantsList = require('../../restaurant.json');

const Restaurant = require('../../models/restaurant');

//show all the restaurants
router.get('/', (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort('_id')
    .then((item) => res.render('home', { item }))
    .catch((err) => console.log(err));
});

//sort the restaurants according to PARARMS of GET request
router.get('/sort/:by', (req, res) => {
  const sortBy = req.params.by;
  Restaurant.find()
    .lean()
    .sort(sortBy)
    .then((item) => res.render('home', { item }))
    .catch((err) => console.log(err));
});

/////////SEARCH BY KEYWORD
router.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  Restaurant.find({
    $or: [
      { name: { $regex: `${keyword}`, $options: 'i' } },
      { category: { $regex: `${keyword}`, $options: 'i' } }
    ]
  })
    .lean()
    .then((item) => res.render('home', { item, keyword }))
    .catch((err) => console.log(err));
});

// enter the add page
router.get('/new', (req, res) => {
  res.render('new');
});

//POST: add a new restaurant
router.post('/new', (req, res) => {
  const userId = req.user._id;
  if (!req.body.image) {
    req.body.image = `https://image.freepik.com/free-vector/elegant-restaurant-composition_23-2147855078.jpg`;
  }
  req.body.userId = userId;
  const info = req.body;
  Restaurant.create(info)
    .then(res.redirect('/'))
    .catch((err) => console.log(err));
});

module.exports = router;
