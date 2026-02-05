import User from '../models/User.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function createUserService({ name, email, password}) {
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