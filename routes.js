const PostsController = require('./controllers/posts_controller');
const LoginController = require('./controllers/auth_controller');
const passport = require('passport');
require('./services/passport');

// const User = require('./models/user');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// const requireSignin = passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// });

module.exports = (app) => {
  app.get('/', PostsController.allPosts);
  app.get('/post/:id', requireAuth, PostsController.getPost);

  app.get('/post/create/new', PostsController.newPost);
  app.post('/post/create/new', PostsController.create);
  app.get('/post/edit/:id', PostsController.editPage);
  app.post('/post/edit/:id', PostsController.edit);
  app.get('/post/delete/:id', PostsController.remove);

  app.get('/login', LoginController.loginView);
  app.post('/login', requireSignin, LoginController.signin);
  app.get('/logout', LoginController.logout);


  // app.post('/user', (req, res) => {
  //   User.create(req.body)
  //     .then((user) => {
  //       res.send(user);
  //     }).catch(err => console.log(err));
  // });
};
