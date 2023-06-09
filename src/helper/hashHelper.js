const bcrypt = require('bcrypt');

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

const encryptPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

module.exports = {
    comparePassword,
    encryptPassword,
};