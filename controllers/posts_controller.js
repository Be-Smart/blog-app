const BlogPost = require('../models/blogPost');
const moment = require('moment');

module.exports = {

  allPosts(req, res) {
    BlogPost.find({}).sort({createdAt: -1})
      .then(posts => {
        res.render('posts-list', { title: 'My Blog', posts });
      });
  },

  getPost(req, res) {
    console.log(req.user);
    const postId = req.params.id;

    BlogPost.findOne({_id: postId})
      .then(post => {
        const { title, content } = post;
        const createdAt = moment(post.createdAt).format('MMM, Do, YYYY');

        res.render('post', {title, content, createdAt, postId, isAuth: req.isAuthenticated()});
      })
  },

  newPost(req, res) {
    console.log(req.isAuthenticated());

    if (req.isAuthenticated()) {
      res.render('new-post', {title: 'Create new blog post'});
      return;
    }
    res.redirect('/login');
  },

  create(req, res) {
    BlogPost.create(req.body)
      .then(() => {
        res.redirect('/');
      })
  },

  editPage(req, res) {
    const postId = req.params.id;

    BlogPost.findOne({_id: postId})
      .then(post => {
        const { title, content } = post;
        res.render('edit-post', {title, content, postId});
      })
  },

  edit(req, res) {
    const postId = req.params.id;
    const { title, content } = req.body;
    const updatedAt = new Date();

    BlogPost.findOneAndUpdate({_id: postId}, {title, content, updatedAt})
      .then(() => {
        res.redirect(`/post/${postId}`);
      });
  },

  remove(req, res) {
    const postId = req.params.id;

    BlogPost.findOneAndRemove({_id: postId})
      .then(() => {
        res.redirect('/');
      })
  }
};
