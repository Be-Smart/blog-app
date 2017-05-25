const PostsController = require('./controllers/posts_controller');
const AdminController = require('./controllers/admin_controller');
const AuthController = require('./controllers/auth_controller');
const passport = require('passport');

// const User = require('./models/user');

const requireSignin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

module.exports = (app) => {
  app.get('/', PostsController.allPosts);
  app.get('/post/:id', PostsController.getPost);

  app.get('/admin/create/new',
   AuthController.requireAuth,
   AdminController.newPost
  );
  app.post('/admin/create/new',
   AuthController.requireAuth,
   AdminController.create
  );
  app.get('/admin/edit/:id',
   AuthController.requireAuth,
   AdminController.editPage
  );
  app.post('/admin/edit/:id',
   AuthController.requireAuth,
   AdminController.edit
  );
  app.get('/admin/delete/:id',
   AuthController.requireAuth,
   AdminController.remove
  );

  app.get('/login', AuthController.loginView);
  app.post('/login', requireSignin);
  app.get('/logout', AuthController.logout);


  // app.post('/user', (req, res) => {
  //   User.create(req.body)
  //     .then((user) => {
  //       res.send(user);
  //     }).catch(err => console.log(err));
  // });
};
