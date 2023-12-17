import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './router/userRouter.js';
import authRouter from './router/authRouter.js';
dotenv.config()

const app = express();
const PORT = 3000;
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to MongoDB!');
}).catch((err) => {
    console.log(err);
})


app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})