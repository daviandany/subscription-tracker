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

export async function getById({ id }) {
    const user = await User.findOne( { where: { id }, attributes: ['id', 'name', 'email'] } )
    if (!user){
        throw new Error('usuário não encontrado');
    }

    return user
}

export async function getAllUsers(){
    const users = await User.findAll();

    return users;
}