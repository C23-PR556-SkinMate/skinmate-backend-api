const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helper/hashHelper');
require('dotenv').config();

const {
    loginModel,
    emailExistsModel,
    registerModel,
} = require('../model/authModel');

const {
    validateEmail,
    validateDate,
    validateSkinType,
    validateGender,
} = require('../helper/formatValidationHelper');
const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({
            message: 'Missing email or password',
        });
    }

    if (!validateEmail(email)) {
        return res.status(409).json({
            message: 'Invalid email format',
        });
    }

    try {
        const userSnapshot = await loginModel(email);

        if (userSnapshot.empty) {
            return res.status(404).json({
                message: 'Email does not exists',
            });
        }
        
        const uid = userSnapshot.docs[0].id;
        const hashedPassword = userSnapshot.docs[0].data().password;

        if (await comparePassword(password, hashedPassword)) {
            const token = jwt.sign({uid, email}, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({
                data : {
                    uid,
                    token,
                },
                message: 'Logged in successfully',
                success: true,
            });
        } else {
            res.status(404).json({
                message: 'Wrong password',
            });
        }
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    const {
        email,
        password,
        displayName,
        dateOfBirth,
        skinType,
        gender,
    } = req.body;

    if (!email || !password) {
        return res.status(404).json({
            message: 'Missing email or password',
        });
    }

    if (!validateEmail(email)) {
        return res.status(409).json({
            message: 'Invalid email format',
        });
    }

    if (!validateDate(dateOfBirth)) {
        return res.status(404).json({
            message: 'Error, invalid date format',
        });
    }

    if (!validateSkinType(skinType)) {
        return res.status(404).json({
            message: 'Error, skin type does not exist',
        });
    }
    
    if (!validateGender(gender)) {
        return res.status(404).json({
            message: 'Error, gender type does not exist',
        });
    }

    try {
        const { userRef, checkEmails } = await emailExistsModel(email);

        if (!checkEmails.empty) {
            return res.status(409).json({
                message: 'Email already exists',
            });
        }

        const newUserRef = userRef.doc();

        await registerModel(
            newUserRef,
            password,
            email,
            displayName,
            dateOfBirth,
            skinType,
            gender,
        );
        
        res.status(200).json({
            message: 'Registered successfully',
            success: true,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register,
};