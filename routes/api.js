const express = require('express');
const router = express.Router();

var userRoutes = require('./api/user.route');
var postsRoutes = require('./api/posts.route');
var followRoutes = require('./api/follow.route');


router.use('/user', userRoutes);
router.use('/posts', postsRoutes);
router.use('/follow', followRoutes);


module.exports = router;

