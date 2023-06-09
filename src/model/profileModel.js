const app = require('../firebase');
const db = app.firestore();

const getProfileModel = async (uid) => {
    const profileRef = db.collection('profiles');
    const profileSnapshot = await profileRef.doc(uid).get();
    return profileSnapshot;
};

const updateProfileModel = async (uid, obj) => {
    const profileRef = db.collection('profiles');
    const updatedAt = Date.now();

    await profileRef.doc(uid).set({
        ...obj,
        updatedAt,
    }, {
        merge: true,
    });
};

const updateProfilePictureModel = async (uid, url) => {
    const profileRef = db.collection('profiles');
    const updatedAt = Date.now();

    await profileRef.doc(uid).set({
        profileImg: url,
        updatedAt
    }, {
        merge: true
    });
};

module.exports = {
    getProfileModel,
    updateProfileModel,
    updateProfilePictureModel,
};