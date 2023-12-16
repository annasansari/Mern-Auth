import express from "express";
import signIn from "../controllers/signin.auth.controller.js";
import signUp from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)

export default router
