const express = require('express');
const router = express.Router();
const { handleResult } = require('../controller/resultController');

// POST /api/results/:user_id/:scan_id
// eslint-disable-next-line no-undef
router.post('/result', handleResult);

module.exports = router;
