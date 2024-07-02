import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { authenticate } from "../config/jwt.config.js";


export const usersRouter = Router()

usersRouter.route('/')
.get(authenticate, userController.getAll)

usersRouter.route('/logout')
    .post(authenticate, userController.logout)

usersRouter.route('/:id')
.get(authenticate, userController.getOne)
.delete(authenticate, userController.delete)
.put(authenticate, userController.update)    

export const loginRouter = Router()
loginRouter.route('/login')
    .post(userController.login)

loginRouter.route('/register')
    .post(userController.register)
