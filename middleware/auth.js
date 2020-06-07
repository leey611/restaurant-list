module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
      return;
    }
    req.flash('warning_msg', 'Please login');
    res.redirect('/users/login');
  }
};
