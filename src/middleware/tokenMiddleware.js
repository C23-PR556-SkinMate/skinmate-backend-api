const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err) return res.sendStatus(401);
        req.uid = result.uid;
        next();
    });
};

module.exports = {
    verifyToken,
};