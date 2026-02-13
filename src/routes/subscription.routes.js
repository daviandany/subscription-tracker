import express from 'express';
const subsRouter = express.Router();
import auth from '../middlewares/jwt.js';
import * as subscriptionController from '../controllers/subscription.controller.js';

subsRouter.post('/subscriptions/create', auth, subscriptionController.createSubscriptionController)
subsRouter.get('/subscriptions/get-by-id', auth, subscriptionController.getByIdController)
subsRouter.get('/subscriptions/get-all', auth, subscriptionController.getAllSubscriptionController)
subsRouter.get('/subscriptions/get-by-user', auth, subscriptionController.getByIdUserController)
export default subsRouter