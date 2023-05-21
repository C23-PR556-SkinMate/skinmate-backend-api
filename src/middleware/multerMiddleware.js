const multer = require('multer');

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = multerMiddleware;