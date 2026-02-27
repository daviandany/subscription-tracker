import express from 'express';
const subsRouter = express.Router();
import auth from '../middlewares/jwt.js';
import * as subscriptionController from '../controllers/subscription.controller.js';

subsRouter.post('/create', auth, subscriptionController.createSubscriptionController)
subsRouter.get('/get-by-id', auth, subscriptionController.getByIdController)
subsRouter.get('/get-all', auth, subscriptionController.getAllSubscriptionController)
subsRouter.get('/get-by-user', auth, subscriptionController.getByIdUserController)
subsRouter.get('/filter', auth, subscriptionController.filterSubsByCategory)

export default subsRouter

