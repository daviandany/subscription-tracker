import { createUserService } from '../services/user.service.js';

export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password){
            return res.status(400).json( {error : 'corpo inválido'} )
        }

        const user = await createUserService( {name, email, password} )

        const { password: _, ...userWithoutPassword } = user.toJSON()
        res.status(201).json(userWithoutPassword)
    } catch (err) {
        res.status(400).json(  {error: err.message} )
    }
}