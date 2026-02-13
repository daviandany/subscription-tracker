import express from 'express';
const userRouter = express.Router();
import * as userController from '../controllers/user.controller.js';

userRouter.post('/users', userController.createUser);
userRouter.post('/users/login', userController.loginController);
userRouter.get('/users/by-id', userController.getUserById);
userRouter.get('/users/get-all', userController.getAllUsersController);
export default userRouter

