const express = require('express');
const router = express.Router();
const followController = require('../../controllers/follow.controller');
const authorization = require('../../middleware/authorization');

router.post('/:id', authorization, followController.followUser);
router.delete('/unfollow/:id',authorization ,followController.unfollowUser);
router.get('/followers', authorization, followController.getFollowers);
router.get('/following', authorization, followController.getFollowing);


module.exports = router;

