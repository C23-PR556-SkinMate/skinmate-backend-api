const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/customParseFormat'));

const validSkinTypes = ['normal', 'oily', 'dry', 'combination'];
const validGender = ['male', 'female'];

const validateSkinType = (skinType) => {
    if (skinType !== undefined) {
        if (skinType === '') return true;
        return validSkinTypes.includes(skinType);  
    }
    return true;
};

const validateGender = (gender) => {
    if (gender !== undefined) {
        if (gender === '') return true;
        return validGender.includes(gender);  
    }
    return true;
};

const validateTime = (time) => {
    if (time !== undefined) {
        if (time === '') return true;
        return dayjs(time, 'HH:mm:ss', true).isValid();
    }
    return true;
};

const validateDate = (date) => {
    if (date !== undefined) {
        if (date === '') return true;
        return dayjs(date, 'DD/MM/YYYY', true).isValid();
    }
    return true;
};

module.exports = {
    validateSkinType,
    validateGender,
    validateDate,
    validateTime,
};