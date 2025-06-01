const express = require('express');
const router = express.Router();
const postController = require('../../controllers/posts.controller');
const authorization = require('../../middleware/authorization');

router.post('/', authorization, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/mine', authorization, postController.getMyPosts);
router.delete('/:id', authorization, postController.deletePost);

module.exports = router;