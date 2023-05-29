const admin = require('firebase-admin');
const serviceAccount = require('../config/service-account.json');
require('dotenv').config();

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.GCS_BUCKET_1
});

module.exports = app;
