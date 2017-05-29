const BlogPost = require('../models/blogPost');
const moment = require('moment');
const marked = require('marked');

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
        const { title, content: mdContent } = post;
        const content = marked(mdContent);
        const createdAt = moment(post.createdAt).format('MMM, Do, YYYY');

        res.render('post', { title, content, createdAt, postId, isAdmin });
      });
  },

};
