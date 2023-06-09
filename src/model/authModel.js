const app = require('../firebase');
const db = app.firestore();

const { encryptPassword } = require('../helper/hashHelper');

const loginModel = async (email) => {
    const userRef = db.collection('users');
    const userSnapshot = await userRef
        .where('email', '==', email)
        .limit(1)
        .get();

    return userSnapshot;
};

const emailExistsModel = async (email) => {
    const userRef = db.collection('users');
    const checkEmails = await userRef
        .where('email', '==', email)
        .get();

    return { userRef, checkEmails };
};

const registerModel = async (
    userRef,
    password,
    email,
    displayName,
    dateOfBirth,
    skinType,
    gender
) => {
    const hashedPassword = await encryptPassword(password);
    const createdAt = Date.now();
        
    await userRef.set({
        email,
        password: hashedPassword,
        verified: false,
        createdAt,
        updatedAt : createdAt,
    });
        
    const profileRef = db.collection('profiles');
    const uid = userRef.id;

    await profileRef.doc(uid).set({
        displayName: displayName || email.split('@')[0],
        dateOfBirth: dateOfBirth || '',
        skinType: skinType || '',
        gender: gender || '',
        createdAt,
        updatedAt : createdAt,
    });
};

module.exports = {
    loginModel,
    emailExistsModel,
    registerModel,
};
