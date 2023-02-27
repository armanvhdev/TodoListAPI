import express from 'express'

const router = express.Router()

import userController from '../controller/user.js'

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

export default router
