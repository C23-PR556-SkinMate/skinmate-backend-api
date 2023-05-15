const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.json({ message: 'Sandbox API' });
});

server.use('/api', require('./src/routes/authRouter'));
server.use('/api', require('./src/routes/profileRouter'));

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});