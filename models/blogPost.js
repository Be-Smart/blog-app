const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  createdAt: { type: Date, default: new Date()},
  updatedAt: { type: Date, default: new Date()}
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
