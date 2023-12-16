import User from "../model/userSchema.js"
import bcrypt from 'bcrypt'
import errorHandler from "../utils/error.js";
import Jwt from "jsonwebtoken";

const signIn = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validUser) return next(errorHandler(401, 'Wrong credentials'))
        var token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        // const expiryDate = new Date(Date.now() + 3600000)
        res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export default signIn