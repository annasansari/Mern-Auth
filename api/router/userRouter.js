import express from 'express'
import { test } from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyToken.js'
import { deleteUser, updateUser } from '../controllers/updateUser.js'

const router = express.Router()

router.get('/', test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)

export default router