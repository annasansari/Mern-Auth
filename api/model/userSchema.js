import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUser-avatar.svg&psig=AOvVaw0978aqSCLEtrHIlXrPAaDQ&ust=1703097843278000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjXuoaUnIMDFQAAAAAdAAAAABAD"
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema)
export default User;