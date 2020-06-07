const db = require('../../config/mongoose');
const Restaurant = require('../restaurant');
const User = require('../../models/user');
const restaurantData = require('../../restaurant.json');
const bcrypt = require('bcryptjs');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
];

db.once('open', () => {
  SEED_USERS.forEach((user) => {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(user.password, salt))
      .then((hash) =>
        User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
      )
      .then((user) => {
        const userId = user._id;
        return Promise.all(
          Array.from({ length: 3 }, (value, i) =>
            Restaurant.create({
              name: restaurantData.results[i].name,
              name_en: restaurantData.results[i].name_en,
              category: restaurantData.results[i].category,
              image: restaurantData.results[i].image,
              location: restaurantData.results[i].location,
              phone: restaurantData.results[i].phone,
              google_map: restaurantData.results[i].google_map,
              google_map_iframe: restaurantData.results[i].google_map_iframe,
              rating: restaurantData.results[i].rating,
              description: restaurantData.results[i].description
            })
          )
        );
      })
      .then(() => {
        console.log('done');
        process.exit();
      });
  });

  // restaurantData.results.forEach((detail) => {
  //   Restaurant.create({
  //     name: detail.name,
  //     name_en: detail.name_en,
  //     category: detail.category,
  //     image: detail.image,
  //     location: detail.location,
  //     phone: detail.phone,
  //     google_map: detail.google_map,
  //     google_map_iframe: detail.google_map_iframe,
  //     rating: detail.rating,
  //     description: detail.description
  //   });
  // });
  console.log('Data has been created!');
});
