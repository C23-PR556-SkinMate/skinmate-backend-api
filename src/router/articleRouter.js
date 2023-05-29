const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');



// Define the route for the /articles endpoint
router.get('/articles', articleController.getArticles);

module.exports = router;
