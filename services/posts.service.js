
const Post = require('../models/Posts.model');

exports.createPost = async (userId, data) => {
  const newPost = new Post({ ...data, userId });
  return await newPost.save();
};

exports.getAllPosts = async () => {
  return await Post.find().sort({ createdAt: -1 }).populate('userId', 'username profilePicture');
};

exports.getMyPosts = async (userId) => {
  return await Post.find({ userId }).sort({ createdAt: -1 });
};

exports.deletePost = async (userId, postId) => {
  const post = await Post.findOne({ _id: postId, userId });
  if (!post) throw new Error('Publicación no encontrada o no autorizada');
  return await post.deleteOne();
};
