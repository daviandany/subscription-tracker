import express from 'express';
import userRouter from './routes/user.routes.js';
import substriptionRouter from './routes/user.routes.js'

const app = express();
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', substriptionRouter)

export default app;
