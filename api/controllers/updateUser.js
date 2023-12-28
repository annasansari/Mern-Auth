import User from "../model/userSchema.js"
import errorHandler from "../utils/error.js"
import bcrypt from 'bcrypt'

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can update only your account'))

    try {
        let updatedPassword = null;

        if (req.body.password) {
            updatedPassword = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: updatedPassword,
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

// DeleteUser


export const deleteUser = async (req, res, next) => {
    try {
      // Check if the authenticated user matches the requested user ID
      if (req.user.id !== req.params.id) {
        return res.status(401).json({ error: "You can delete only your account" });
      }
  
      // Find and delete the user by ID
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Respond with a success message
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      // Handle any unexpected errors
      next(error);
    }
  };