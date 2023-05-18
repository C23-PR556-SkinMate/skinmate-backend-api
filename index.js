const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = express();
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, 'docs')));
server.use('/api', require('./src/routes/authRouter'));
server.use('/api', require('./src/routes/profileRouter'));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

server.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Response successful',
        success: true,
    });
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});