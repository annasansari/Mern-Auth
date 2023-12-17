import User from "../model/userSchema.js"
import bcrypt from 'bcrypt'
import errorHandler from "../utils/error.js";
// import errorHandler from "../utils/error.js";


const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({ message: 'User Create Successfully' })
    } catch (error) {
        next(error)
    }
}



export default signUp