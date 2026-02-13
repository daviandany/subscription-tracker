import express from 'express';
const router = express.Router();
import * as subscriptionController from '../controllers/subscription.controller.js';

router.post('subscription/create-subscription', subscriptionController.createSubscriptionController)
router.get('subscription/get-by-id', subscriptionController.getByIdController)
router.get('subscription/get-all', subscriptionController.getAllSubscriptionController)
export default router