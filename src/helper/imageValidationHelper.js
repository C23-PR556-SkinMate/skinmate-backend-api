const getImageType = (file) => {
    return file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2);
};

const validateImageType = (file) => {
    const { originalname, mimetype } = file;

    const allowedFiles = ['png', 'jpg', 'jpeg'];
    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    const fileExt = getImageType(originalname);

    if (!allowedFiles.includes(fileExt) || !allowedFileTypes.includes(mimetype)) {
        return false;
    }

    return true;
};

module.exports = {
    validateImageType,
    getImageType,
};