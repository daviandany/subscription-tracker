import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import subsRouter from './routes/subscription.routes.js';
import { errorHandler } from './middlewares/errors.middleware.js';

const app = express();

// Use a more permissive CORS for debugging
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

app.use('/api', userRouter);
app.use('/api/subscriptions', subsRouter);

app.use(errorHandler);

export default app;