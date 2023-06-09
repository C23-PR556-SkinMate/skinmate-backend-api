const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/tokenMiddleware');
const { predictRateLimitter } = require('../middleware/limiterMiddleware');
const multerMiddleware = require('../middleware/multerMiddleware');
const { setResult, getAllResults } = require('../controller/resultController');

router.post('/result/predict', predictRateLimitter, verifyToken, multerMiddleware.single('file'), setResult);
router.get('/results', verifyToken, getAllResults);

module.exports = router;
