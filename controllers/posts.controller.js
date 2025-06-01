// controllers/post.controller.js
const postService = require('../services/posts.service');

exports.createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.userId, req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await postService.getMyPosts(req.userId);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tus publicaciones' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.userId, req.params.id);
    res.json({ message: 'Publicación eliminada' });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
