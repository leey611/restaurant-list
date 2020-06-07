const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
);

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please complete all the fields' });
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Please check your confirmed password' });
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: 'This email has been registered' });
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      });
    }
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Logout successfully');
  res.redirect('/users/login');
});

module.exports = router;
