import express from 'express';
import userRouter from './routes/user.routes.js';
import substriptionRouter from './routes/subscription.routes.js'
import cors from 'cors';
import { errorHandler } from './middlewares/errors.middleware.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler)

app.use('/api', userRouter);
app.use('/api', substriptionRouter)

export default app;
