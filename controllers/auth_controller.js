
module.exports = {
  loginView(req, res) {
    res.render('login', { title: 'Login' });
  },

  logout(req, res) {
    req.logout();
    res.redirect('/');
  },

  requireAuth(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/login');
  },
};
