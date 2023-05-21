const app = require('../firebase');
const { getImageType } = require('./imageValidationHelper');
const storage = app.storage().bucket();

const uploadImage = (file, uid, folderPath = '') => {
    return new Promise((resolve, reject) => {
        const { originalname, buffer } = file;
        const fileExt = getImageType(originalname);

        const blob = storage.file(`${folderPath}/${uid}-profile-picture.${fileExt}`);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${storage.name}/${blob.name}`;
            resolve(publicUrl);
        }).on('error', () => {
            reject('Unable to upload image, something went wrong');
        }).end(buffer);
    });
};

module.exports = uploadImage;