const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/tokenMiddleware');
const { setProfile, getProfile } = require('../controller/profileController');

router.post('/profile', verifyToken, setProfile);
router.get('/profile', verifyToken, getProfile);
// router.get('/profiles', verifyToken, getAllProfile);

module.exports = router;