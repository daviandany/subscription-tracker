import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user.controller.js';

router.post('/users', userController.createUser);
router.get('/users/by-id', userController.getUserById)
router.get('/users/get-all', userController.getAllUsersController)
export default router