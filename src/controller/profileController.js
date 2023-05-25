const app = require('../firebase');
const { validateImageType } = require('../helper/imageValidationHelper');
const uploadImage = require('../helper/uploadImageHelper');
const db = app.firestore();
require('dotenv').config();

const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/customParseFormat'));

const {
    validateDate,
    validateTime,
    validateGender,
    validateSkinType,
} = require('../helper/formatValidationHelper');

const getProfile = async (req, res, next) => {
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
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    const { uid } = req.params;
    const compareUid = req.result.uid;
    const {
        displayName,
        description,
        dateOfBirth,
        skinType,
        gender,
        reminderDay,
        reminderNight,
    } = req.body;

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

    const updateObj = {
        displayName,
        description,
        dateOfBirth,
        skinType,
        gender,
        reminderDay,
        reminderNight,  
    };

    const newObj = Object.keys(updateObj)
        .filter((k) => updateObj[k] != undefined)
        .reduce((a, k) => ({ ...a, [k]: updateObj[k] }), {});

    if (!Object.keys(newObj).length) {
        return res.status(404).json({
            message: 'Error, missing parameter',
        });
    }

    if (!validateDate(newObj.dateOfBirth)) {
        return res.status(404).json({
            message: 'Error, invalid date format',
        });
    }

    if (!validateTime(newObj.reminderDay)) {
        return res.status(404).json({
            message: 'Error, invalid reminderDay format',
        });
    }

    if (!validateTime(newObj.reminderNight)) {
        return res.status(404).json({
            message: 'Error, invalid reminderNight format',
        });
    }

    if (!validateSkinType(newObj.skinType)) {
        return res.status(404).json({
            message: 'Error, skin type does not exist',
        });
    }

    if (!validateGender(newObj.gender)) {
        return res.status(404).json({
            message: 'Error, gender type does not exist',
        });
    }

    try {
        const profileRef = db.collection('profiles');
        const updatedAt = Date.now();

        await profileRef.doc(uid).set({
            ...newObj,
            updatedAt,
        }, {
            merge: true,
        });

        return res.status(200).json({
            message: 'Successfully updated the user profile',
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

const setProfilePicture = async (req, res, next) => {
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
        const url = await uploadImage(file, uid, 'profile-picture');
        
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
        next(error);
    }
};

module.exports = {
    getProfile,
    setProfilePicture,
    updateProfile,
};