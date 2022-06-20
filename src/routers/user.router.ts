import { Router } from 'express'
import { UserController } from '../controllers'
import { ValidationMiddleware } from '../middlewares'
import { createUserSchema, loginSchema } from '../schemas'

const userRouter = Router()

userRouter.post('/user', ValidationMiddleware(createUserSchema), UserController.create)
userRouter.post('/login', ValidationMiddleware(loginSchema), UserController.login)

export default userRouter
