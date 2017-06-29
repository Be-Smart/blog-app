const BlogPost = require('../models/blogPost');
const User = require('../models/user');

module.exports = {
  newPost(req, res) {
    res.render('new-post', { title: 'Create new blog post' });
  },

  create(req, res) {
    const authorId = req.session.passport.user;
    const post = new BlogPost({
      title: req.body.title,
      content: req.body.content,
    });

    User.findOne({ _id: authorId })
      .then((user) => {
        post.author = user;
        post.save().then(() => res.redirect('/'));
      })
      .catch(error => global.console.log(error));
    // BlogPost.create(req.body)
    //   .then(() => {
    //     res.redirect('/');
    //   });
  },

  editPage(req, res) {
    const postId = req.params.id;

    BlogPost.findOne({ _id: postId })
      .then((post) => {
        const { title, content } = post;
        res.render('edit-post', { title, content, postId });
      });
  },

  edit(req, res) {
    const postId = req.params.id;
    const { title, content } = req.body;
    const updatedAt = new Date();

    BlogPost.findOneAndUpdate({ _id: postId }, { title, content, updatedAt })
      .then(() => {
        res.redirect(`/post/${postId}`);
      });
  },

  remove(req, res) {
    const postId = req.params.id;

    BlogPost.findOneAndRemove({ _id: postId })
      .then(() => {
        res.redirect('/');
      });
  },

};
