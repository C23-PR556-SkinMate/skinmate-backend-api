const app = require('../firebase');
const storage = app.storage().bucket();

const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const { originalname, buffer } = file;
    
        const blob = storage.file(`profile-picture/${originalname.replace(/ /g, '_')}`);
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