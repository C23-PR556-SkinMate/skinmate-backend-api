const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'sandbox-bucket-101'
});

module.exports = app;
