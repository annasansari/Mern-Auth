import express from 'express'
import { test } from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyToken.js'
import { updateUser } from '../controllers/updateUser.js'

const router = express.Router()

router.get('/', test)
router.post('/update/:id', verifyToken, updateUser)

export default router