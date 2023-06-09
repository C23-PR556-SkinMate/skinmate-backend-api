const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/tokenMiddleware');
const { getProducts } = require('../controller/productController');

router.get('/products', verifyToken, getProducts);

module.exports = router;