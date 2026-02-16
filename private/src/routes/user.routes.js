import express from 'express';
const userRouter = express.Router();
import * as userController from '../controllers/user.controller.js';
import { registerLimiter } from '../middlewares/rateLimit.middleware.js';

userRouter.post('/users', registerLimiter, userController.createUser);
userRouter.post('/users/login', userController.loginController);
userRouter.get('/users/by-id', userController.getUserById);
userRouter.get('/users/get-all', userController.getAllUsersController);
export default userRouter

