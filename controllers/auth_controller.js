const passport = require('passport');

module.exports = {
  loginView(req, res) {
    res.render('login', {title: 'Login'});
  },

  logout(req, res) {
    req.logout();
    res.redirect('/login');
  }
};
