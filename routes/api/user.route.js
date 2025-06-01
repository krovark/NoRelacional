// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users.controller');
const authorization = require('../../middleware/authorization');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/profile', authorization, userController.updateProfile);

module.exports = router;
