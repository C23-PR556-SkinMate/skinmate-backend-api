const app = require('../firebase');
const db = app.firestore();
require('dotenv').config();

const setProfile = async (req, res) => {
    const uid = req.uid;
    const { displayName, description } = req.body;

    try {
        const profileRef = db.collection('profiles');
        const createdAt = Date.now();
        
        await profileRef.doc(uid).set({
            displayName,
            description,
            createdAt,
            updatedAt : createdAt,
        });
        
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

const getProfile = async (req, res) => {
    const uid = req.uid;

    try {
        const profileRef = db.collection('profiles');
        const profileSnapshot = await profileRef.doc(uid).get();
        
        if (profileSnapshot.exists) {
            const { displayName, description } = profileSnapshot.data();
            res.status(200).json({
                data: {
                    displayName,
                    description,
                },
                success: true,
            });
        } else {
            res.status(200).json({
                data: {},
                success: true,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

module.exports = {
    setProfile,
    getProfile,
};