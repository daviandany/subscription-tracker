import { createSubscriptionService, getById, getAllSubscription, getByIdUser } from '../services/subscription.service.js'

export async function createSubscriptionController(req, res) {
    try {
        const { price, day, platform, category } = req.body;
        const userId = req.user.id;

       if(!userId || !price || !day || !platform || !category) {
        return res.status(400).json({ error: 'Assinatura inválida' })
       } 

       const subscription = await createSubscriptionService({ userId, price, day, platform, category })
       
       res.status(201).json(subscription)
    } catch (err) {
        res.status(400).json( { error: err.message} )
    }
}

export async function getByIdController(req, res) {
    try {
        const { id } = req.query;

        if(!id || id === 0){
            return res.status(400).json( { error: "id inválida" } )
        }

        const subscription = await getById( {id} ) 
        res.status(200).json(subscription)    
    } catch(error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export async function getAllSubscriptionController(req, res) {
    try {
        let subscription = await getAllSubscription()
        res.status(200).json(subscription)
    } catch (error){
        return res.status(500).json({
            error: error.message
        })
    }
}

export async function getByIdUserController(req, res) {
    try {
        const { userId } = req.query;
        
        if (!userId) {
            return res.status(400).json( { error: "id inválida" } )
        }

        let subs = await getByIdUser( { userId } )
        res.status(200).json(subs)
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

