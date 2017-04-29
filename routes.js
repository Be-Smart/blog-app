const GuestController = require('./controllers/guest_controller');

module.exports = (app) => {
  app.get('/', GuestController.allPosts);
  app.get('/post/:id', GuestController.getPost);
};
