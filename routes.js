const PostsController = require('./controllers/posts_controller');

module.exports = (app) => {
  app.get('/', PostsController.allPosts);

  app.get('/post/:id', PostsController.getPost);
  app.put('/post/:id', PostsController.edit);
  app.delete('/post/:id', PostsController.remove);

  app.post('/post/new', PostsController.create);
};
