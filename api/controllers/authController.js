import User from "../model/userSchema.js"
import bcryptjs from 'bcryptjs'
import errorHandler from "../utils/error.js";


const signUp = async (req, res, next) => {
    // console.log(req.body);
    const { username, email, password } = req.body
    let hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({ message: 'User Create Successfully' })
    } catch (error) {
        next(error)
        // next(errorHandler(300, 'Something went wrong'))
    }
}
export default signUp