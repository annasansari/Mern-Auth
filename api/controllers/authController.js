import User from "../model/userSchema.js"
<<<<<<< HEAD
import bcrypt from 'bcrypt'
import errorHandler from "../utils/error.js";
=======
// import bcryptjs from 'bcryptjs'
>>>>>>> 64c7fe769b04c68daaabc22bf4286491840d1c1f
// import errorHandler from "../utils/error.js";


const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
<<<<<<< HEAD
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
=======
    // let hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password })
>>>>>>> 64c7fe769b04c68daaabc22bf4286491840d1c1f
    try {
        await newUser.save()
        res.status(201).json({ message: 'User Create Successfully' })
    } catch (error) {
        next(error)
    }
}



export default  signUp