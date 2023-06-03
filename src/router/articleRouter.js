const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/tokenMiddleware');
const { getArticles } = require('../controller/articleController');


// Define the route for the /articles endpoint
router.get('/articles', verifyToken, getArticles);

module.exports = router;
