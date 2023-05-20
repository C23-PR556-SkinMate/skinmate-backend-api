const express = require('express');
const router = express.Router();
const { authRateLimitter } = require('../middleware/limiterMiddleware');
const { login, register } = require('../controller/authController');

router.post('/login', authRateLimitter, login);
router.post('/register', authRateLimitter, register);

module.exports = router;