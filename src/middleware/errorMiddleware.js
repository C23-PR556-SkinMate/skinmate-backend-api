const errorMiddleware = (err, req, res, _next) => {
    res.status(500).json({
        message: 'Something went wrong'
    });
};

module.exports = errorMiddleware;