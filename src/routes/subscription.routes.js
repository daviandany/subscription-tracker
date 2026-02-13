import express from 'express';
const router = express.Router();
import auth from '../middlewares/jwt.js';
import * as subscriptionController from '../controllers/subscription.controller.js';

router.post('/subscription/create-subscription', auth, subscriptionController.createSubscriptionController)
router.get('/subscription/get-by-id', auth, subscriptionController.getByIdController)
router.get('/subscription/get-all', auth, subscriptionController.getAllSubscriptionController)
export default router