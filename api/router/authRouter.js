import express from "express";
import signIn from "../controllers/signin.auth.controller.js";
import signUp from '../controllers/authController.js'
import signInWithGoogle from "../controllers/authGoogle.js";

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', signInWithGoogle)

export default router
