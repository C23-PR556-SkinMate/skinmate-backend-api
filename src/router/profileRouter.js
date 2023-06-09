const express = require('express');
const router = express.Router();
const multerMiddleware = require('../middleware/multerMiddleware');
const { verifyToken } = require('../middleware/tokenMiddleware');
const {
    updateProfile,
    getProfile,
    setProfilePicture,
} = require('../controller/profileController');

router.post('/profile/:uid/upload', verifyToken, multerMiddleware.single('file'), setProfilePicture);
router.get('/profile/:uid', verifyToken, getProfile);
router.put('/profile/:uid', verifyToken, updateProfile);

module.exports = router;