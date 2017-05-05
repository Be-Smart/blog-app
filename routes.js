const PostsController = require('./controllers/posts_controller');

module.exports = (app) => {
  app.get('/', PostsController.allPosts);

  app.get('/post/:id', PostsController.getPost);
  app.get('/post/create/new', PostsController.newPost);
  app.post('/post/create/new', PostsController.create);
  app.get('/post/edit/:id', PostsController.editPage);
  app.post('/post/edit/:id', PostsController.edit);
  app.get('/post/delete/:id', PostsController.remove);
};
