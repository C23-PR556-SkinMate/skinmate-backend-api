const rateLimit = require('express-rate-limit');

const authRateLimitter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    message: 'You have exceeded the request limit',
});

const predictRateLimitter = rateLimit({
    windowMs: 120 * 1000,
    max: 120,
    message: 'You have exceeded the request limit'
});

module.exports = {
    authRateLimitter,
    predictRateLimitter,
};