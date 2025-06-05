// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users.controller');
const authorization = require('../../middleware/authorization');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authorization, userController.logout);
router.put('/profile', authorization, userController.updateProfile);
router.get('/all', authorization, userController.getAllUsers);

module.exports = router;
