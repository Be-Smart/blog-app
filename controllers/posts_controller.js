const BlogPost = require('../models/blogPost');
const User = require('../models/user');

module.exports = {

  allPosts(req, res) {
    const isAdmin = req.isAuthenticated();

    BlogPost.find({}).sort({ createdAt: -1 })
      .then((posts) => {
        res.render('posts-list', { title: 'My Blog', posts, isAdmin });
      });
  },

  getPost(req, res) {
    const postId = req.params.id;
    const isAdmin = req.isAuthenticated();

    BlogPost.findOne({ _id: postId })
      .then((post) => {
        User.findOne({ _id: post.author })
          .then(user => res.render('post', { post, author: user.name, postId, isAdmin }));
      });
  },

};
