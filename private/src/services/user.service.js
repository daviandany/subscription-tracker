import User from '../models/User.js';
import { AppError } from '../utils/apperror.js';
import { comparePasswords, hashPassword } from '../utils/hash.js';

export async function createUserService({ name, email, password }) {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
        where: { email: normalizedEmail }
    });

    if (existingUser) {
        throw new AppError('Email já em uso', 403);
    }

    const hashedPassword = await hashPassword(password);

    return User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword
    });
}


export async function getById({ id }) {
    const user = await User.findOne( { where: { id }, attributes: ['id', 'name', 'email'] } )
    if (!user){
        throw new AppError('Usuário não encontrado', 404);
    }

    return user
}

export async function getAllUsers(){
    const users = await User.findAll();

    return users;
}

export async function login({ password, email }){
    const user = await User.findOne( { where: { email } } )

    if(!user){
        throw new AppError('Email ou senha incorreta', 401);
    }

    const isMatch = await comparePasswords(user.password, password)

    if (!isMatch) {
        throw new AppError('Email ou senha incorreta', 401);
    }

    return user
}