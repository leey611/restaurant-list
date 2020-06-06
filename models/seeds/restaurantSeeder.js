const db = require('../../config/mongoose');
const Restaurant = require('../restaurant');
const restaurantData = require('../../restaurant.json');

db.once('open', () => {
  restaurantData.results.forEach((detail) => {
    Restaurant.create({
      name: detail.name,
      name_en: detail.name_en,
      category: detail.category,
      image: detail.image,
      location: detail.location,
      phone: detail.phone,
      google_map: detail.google_map,
      google_map_iframe: detail.google_map_iframe,
      rating: detail.rating,
      description: detail.description
    });
  });
  console.log('Data has been created!');
});
