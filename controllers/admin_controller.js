const BlogPost = require('../models/blogPost');

module.exports = {
  newPost(req, res) {
    res.render('new-post', {title: 'Create new blog post'});
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
