const express = require('express');
const router = express.Router();
const multerMiddleware = require('../middleware/multerMiddleware');
const { verifyToken } = require('../middleware/tokenMiddleware');
const { setProfile, getProfile, setProfilePicture } = require('../controller/profileController');

router.post('/profile', verifyToken, setProfile);
router.post('/profile/upload', verifyToken, multerMiddleware.single('file'), setProfilePicture);
router.get('/profile/:uid', verifyToken, getProfile);

module.exports = router;