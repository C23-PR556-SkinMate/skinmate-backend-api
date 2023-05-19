const app = require('../firebase');
const db = app.firestore();
require('dotenv').config();

const template = {
    displayName: '',
    description: '',
    birthday: '',
    profileImg: '',
    hobby: '',
};

const setProfile = async (req, res) => {
    const uid = req.uid;
    const { displayName, description } = req.body;

    try {
        const profileRef = db.collection('profiles');
        const createdAt = Date.now();
        
        await profileRef.doc(uid).set({
            ...template,
            displayName,
            description,
            createdAt,
            updatedAt : createdAt,
        });
        
        return res.status(200).json({
            message: 'Successfully set the user profile',
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
    
    res.status(500);
};

const getProfile = async (req, res) => {
    const { uid } = req.params;

    try {
        const profileRef = db.collection('profiles');
        const profileSnapshot = await profileRef.doc(uid).get();
        
        if (profileSnapshot.exists) {
            const { displayName, description } = profileSnapshot.data();
            return res.status(200).json({
                data: {
                    displayName,
                    description,
                },
                message: 'Successfully found the user profile',
                success: true,
            });
        } else {
            return res.status(404).json({
                message: 'Cannot find the user profile',
            });
        }
    } catch (error) {
        console.log(error);
    }
    
    res.status(500);
};

module.exports = {
    setProfile,
    getProfile,
};