import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './router/userRouter.js';
dotenv.config()

const app = express();
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);
})

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to MongoDB!');
}).catch((err) => {
    console.log(err);
})


app.use('/api/user', userRouter)