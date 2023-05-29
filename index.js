const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const errorMiddleware = require('./src/middleware/errorMiddleware');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const server = express();

server.disable('x-powered-by');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(express.static(path.join(__dirname, 'docs')));
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

server.use('/api', require('./src/router/authRouter'));
server.use('/api', require('./src/router/profileRouter'));
server.use('/api', require('./src/router/productRouter'));
server.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Response successful',
        success: true,
    });
});

server.use(errorMiddleware);

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});