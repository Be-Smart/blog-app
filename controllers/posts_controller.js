const BlogPost = require('../models/blogPost');

module.exports = {

  allPosts(req, res) {
    BlogPost.find({})
      .then(posts => {
        res.render('posts-list', { title: 'My Blog', posts });
      });
  },

  getPost(req, res) {
    const postId = req.params.id;

    BlogPost.findOne({_id: postId})
      .then(post => {
        res.render('post', post);
      })
  },

  create(req, res) {
    const postProp = req.body;

    BlogPost.create(postProp)
      .then(post => res.send(post))
      .catch(err => console.log(err));
  },

  edit(req, res) {},
  remove(req, res) {}
};
