
module.exports = {

  allPosts(req, res) {
    res.render('posts-list', { title: 'My Blog' });
  },

  getPost(req, res) {
    res.render('post');
  }

};
