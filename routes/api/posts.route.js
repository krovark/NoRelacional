const express = require('express');
const router = express.Router();
const postController = require('../../controllers/posts.controller');
const authorization = require('../../middleware/authorization');

router.post('/createPost', authorization, postController.createPost);
router.get('/getPost', postController.getAllPosts);
router.get('/mine', authorization, postController.getMyPosts);
router.delete('/delete/:id', authorization, postController.deletePost);

module.exports = router;