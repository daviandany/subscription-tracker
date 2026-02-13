import Subscription from "../models/subscription.js";

export async function createSubscriptionService({ userId, price, day, plataform, category }){
        const subscription = await Subscription.create({
            userId,
            price,
            day,
            plataform,
            category
        })
        return subscription;
}

export async function getById({ id }) {
    const subscription = await Subscription.findOne( { where: { id } } )
    if(!subscription){
        throw new Error('Assinatura não encontrada')
    }
    return subscription;
}

export async function getAllSubscription() {
    const subscriptions = await Subscription.findAll();

    return subscriptions;
}

