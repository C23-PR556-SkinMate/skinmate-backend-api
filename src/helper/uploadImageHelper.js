const app = require('../firebase');
const storage = app.storage().bucket();

const uploadImage = (file, uid, folderPath = '') => {
    return new Promise((resolve, reject) => {
        const { buffer } = file;

        const blob = storage.file(`${folderPath}/${uid}-profile-picture.jpg`);
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