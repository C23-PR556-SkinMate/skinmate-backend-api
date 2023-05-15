const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, uid) => {
        if (err) return res.sendStatus(401);
        req.uid = uid;
        next();
    });
};

const refreshToken = () => {};

module.exports = {
    verifyToken,
    refreshToken,
};