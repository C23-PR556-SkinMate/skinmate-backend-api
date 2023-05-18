const express = require('express');
const router = express.Router();
const { authRateLimitter } = require('../middleware/limiterMiddleware');
const { signIn, signUp } = require('../controller/authController');

router.post('/signin', authRateLimitter, signIn);
router.post('/signup', authRateLimitter, signUp);
// router.post('/signout', signOut);

module.exports = router;