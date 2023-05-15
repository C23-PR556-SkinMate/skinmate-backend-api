const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../firebase');
const db = app.firestore();
require('dotenv').config();

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

const encryptPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({
            message: 'Missing email or password',
        });
    }

    try {
        const userRef = db.collection('users');
        const userSnapshot = await userRef.where('email', '==', email).limit(1).get();
        
        if (userSnapshot.empty) {
            return res.status(404).json({
                message: 'Invalid email',
            });
        }
        
        const uid = userSnapshot.docs[0].id;
        const hashedPassword = userSnapshot.docs[0].data().password;

        if (await comparePassword(password, hashedPassword)) {
            const token = jwt.sign(uid, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({
                token,
                success: true,
            });
        } else {
            res.status(404).json({
                message: 'Invalid password',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

const signUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({
            message: 'Missing email or password',
        });
    }

    try {
        const userRef = db.collection('users');
        const hashedPassword = await encryptPassword(password);
        
        await userRef.add({
            email,
            password: hashedPassword,
        });
        
        res.status(200).json({
            message: 'Signed up successfully',
            success: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

module.exports = {
    signIn,
    signUp,
};