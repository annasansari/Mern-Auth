import User from "../model/userSchema.js"
import errorHandler from "../utils/error.js"
import bcrypt from 'bcrypt'

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can update only your account'))
    
    try {
        let updatedPassword = null; // Define updatedPassword variable

        if (req.body.password) {
            updatedPassword = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: updatedPassword, // Use updatedPassword here
                    profilePicture: req.body.profilePicture
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found')); // Handle if user is not found
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}