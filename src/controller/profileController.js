const app = require('../firebase');
const { validateImageType } = require('../helper/imageValidationHelper');
const uploadImage = require('../helper/uploadImageHelper');
const db = app.firestore();
require('dotenv').config();

const template = {
    profileImg: null,
    displayName: '',
    description: '',
    dateOfBirth: '',
    skinType: '',
    gender: '',
    reminderDay: '',
    reminderNight: '',
};

const getProfile = async (req, res) => {
    const { uid } = req.params;
    
    try {
        const profileRef = db.collection('profiles');
        const profileSnapshot = await profileRef.doc(uid).get();
        
        if (profileSnapshot.exists) {
            const { 
                profileImg,
                displayName,
                description,
                dateOfBirth,
                skinType,
                gender,
                reminderDay,
                reminderNight,
            } = profileSnapshot.data();

            return res.status(200).json({
                data: {
                    profileImg,
                    displayName,
                    description,
                    dateOfBirth,
                    skinType,
                    gender,
                    reminderDay,
                    reminderNight,
                },
                message: 'Successfully found the user profile',
                success: true,
            });
        } else {
            return res.status(404).json({
                message: 'Error, cannot find the user profile',
            });
        }
    } catch (error) {
        res.status(500);
    }
};

const setProfile = async (req, res) => {
    const { uid, email } = req.result;
    const { displayName, description } = req.body;
    const compareUid = req.body.uid;

    if (!compareUid) {
        return res.status(404).json({
            message: 'Error, missing uid',
        });
    }

    if (uid !== compareUid) {
        return res.status(404).json({
            message: 'Error, invalid uid'
        });
    }

    try {
        const profileRef = db.collection('profiles');
        const createdAt = Date.now();
        
        await profileRef.doc(uid).set({
            ...template,
            displayName: displayName || email.split['@'][0],
            description,
            createdAt,
            updatedAt : createdAt,
        }, {
            merge: true,
        });
        
        return res.status(200).json({
            message: 'Successfully set the user profile',
            success: true,
        });
    } catch (error) {
        res.status(500);
    }
};

const setProfilePicture = async (req, res) => {
    const { uid } = req.result;
    const file = req.file;
    const compareUid = req.body.uid;

    if (!compareUid) {
        return res.status(404).json({
            message: 'Error, missing uid',
        });
    }

    if (uid !== compareUid) {
        return res.status(404).json({
            message: 'Error, invalid uid'
        });
    }

    if (!file) {
        return res.status(404).json({
            message: 'Error, missing file',
        });
    }

    if (!validateImageType(file)) {
        return res.status(404).json({
            message: 'Error, invalid file type',
        });
    }

    try {    
        const url = await uploadImage(file);
        
        const profileRef = db.collection('profiles');
        const updatedAt = Date.now();

        await profileRef.doc(uid).set({
            profileImg: url,
            updatedAt
        }, {
            merge: true
        });

        return res.status(200).json({
            data: {
                uid,
                profileImg: url,
            },
            message: 'Profile image has been successfully uploaded',
            success: true,
        });
    } catch (error) {
        res.status(500);
    }
};

module.exports = {
    setProfile,
    getProfile,
    setProfilePicture,
};