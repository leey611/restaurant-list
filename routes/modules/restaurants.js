const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');

// see a single restaurant
router.get('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findOne({ userId, _id })
    .lean()
    .then((item) => res.render('show', { item }))
    .catch((err) => console.err(err));
});

// edit a restaurant
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((item) => res.render('edit', { item }))
    .catch((err) => console.log(err));
});

//update restaurant info after edit it
router.put('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const info = req.body;
  if (!info.image) {
    info.image = `https://image.freepik.com/free-vector/elegant-restaurant-composition_23-2147855078.jpg`;
  }
  Restaurant.findOne({ _id, userId })
    .then((item) => {
      item.name = info.name;
      item.category = info.category;
      item.image = info.image;
      item.location = info.location;
      item.phone = info.phone;
      item.google_map = info.google_map;
      item.google_map_iframe = info.google_map_iframe;
      item.rating = info.rating;
      item.description = info.description;
      return item.save();
    })
    .then(res.redirect(`/restaurants/${_id}`))
    .catch((err) => console.log(err));
});

// delete a restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findOne({ _id, userId })
    .then((item) => item.remove())
    .then(res.redirect('/'))
    .catch((err) => console.log(err));
});

module.exports = router;
