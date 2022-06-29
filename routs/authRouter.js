import { Router } from "express";
import {registerValidation, loginValidation}  from '../validations/auth.js'
import checkAuth from '../utils/checkAuth.js'
import userController from '../controlers/UserController.js'
import handleErorM from '../utils/handleErorM.js'

const router = new Router()

router.post('/register', registerValidation, handleErorM, userController.register)
router.post('/login', loginValidation, handleErorM, userController.login)
router.get('/me',checkAuth, userController.checkUser)

export default router