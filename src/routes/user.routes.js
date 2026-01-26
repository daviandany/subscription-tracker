import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user.controller.js';

router.post('/users', userController.createUser);

export default router