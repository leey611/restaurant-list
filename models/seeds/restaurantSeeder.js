if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const db = require('../../config/mongoose');
const User = require('../../models/user');
const Restaurant = require('../restaurant');

const restaurantData = require('../../restaurant.json');
const bcrypt = require('bcryptjs');

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
];

db.once('open', () => {
  const promises = [createSeed(SEED_USERS[0], 0), createSeed(SEED_USERS[1], 3)];

  Promise.all(promises)
    .then(() => {
      console.log('seed created');
      process.exit();
    })
    .catch((err) => console.log(err));

  //console.log('Data has been created!');
});

function createSeed(user, startFrom) {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(user.password, salt))
      .then((hash) =>
        User.create({
          email: user.email,
          password: hash
        })
      )
      .then((createdUser) => {
        const userId = createdUser._id;
        console.log(userId);
        resolve(
          Promise.all(
            Array.from({ length: 3 }, (value, i) => {
              return Restaurant.create({
                name: restaurantData.results[i + startFrom].name,
                name_en: restaurantData.results[i + startFrom].name_en,
                category: restaurantData.results[i + startFrom].category,
                rating: restaurantData.results[i + startFrom].rating,
                image: restaurantData.results[i + startFrom].image,
                location: restaurantData.results[i + startFrom].location,
                google_map: restaurantData.results[i + startFrom].google_map,
                google_map_iframe:
                  restaurantData.results[i + startFrom].google_map_iframe,
                phone: restaurantData.results[i + startFrom].phone,
                description: restaurantData.results[i + startFrom].description,
                userId
              });
            })
          )
          //resolve('rest created');
        );
      });
  });
}
