const express = require('express');
const router = express.Router();
const followController = require('../../controllers/follow.controller');
const authorization = require('../../middleware/authorization');

router.post('/:id', authorization, followController.followUser);
router.delete('unfollow/:id', followController.unfollowUser);

module.exports = router;

