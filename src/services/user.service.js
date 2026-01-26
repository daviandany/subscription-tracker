const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function createUser({ name, email, password}) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });
    
    return newUser;

}

module.exports = {
    createUser
};