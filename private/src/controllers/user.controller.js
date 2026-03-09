import jwt from 'jsonwebtoken'
import { createUserService, getById, getAllUsers, login } from '../services/user.service.js';
import { createUserSchema } from '../validators/user.schema.js';

export async function createUser(req, res) {
    try {
        const parsed = createUserSchema.parse(req.body)
        const user = await createUserService(parsed)

        const { password: _, ...userWithoutPassword } = user.toJSON()
        res.status(201).json(userWithoutPassword)
    } catch (err) {
        res.status(400).json(  {error: err.message} )
    }
}

export async function getUserById(req, res, next) {
    try {
        const { id } = req.query

        if (!id || id === 0){
            return res.status(400).json( {error: "id inválida"} )
        }

        const user = await getById( {id} )
        
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllUsersController(req, res) {
    try {
        let users = await getAllUsers()
        res.status(200).json(users)
    } catch (error) {
         return res.status(500).json({
            error: error.message
        })
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "email ou senha incorreta" })
        }

        const user = await login( { email, password } )

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) throw err
                res.json({ token })
            }
        )
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}