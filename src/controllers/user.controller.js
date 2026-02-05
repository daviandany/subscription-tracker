import { createUserService, getById, getAllUsers } from '../services/user.service.js';

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

export async function getUserById(req, res) {
    try {
        const { id } = req.query

        if (!id || id === 0){
            return res.status(400).json( {error: "id inválida"} )
        }

        const user = await getById( {id} )
        
        const { password: _, ...userWithoutPassword } = user.toJSON()
        res.status(200).json(userWithoutPassword)
    } catch (error) {
        res.status(400).json( {error: error.message} )
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