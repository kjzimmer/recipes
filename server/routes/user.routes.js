import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { authenticate } from "../config/jwt.config.js";


export const baseRouter = Router()
baseRouter.route('/login')
    .post(userController.login)

    baseRouter.route('/register')
    .post(userController.register)

export const usersRouter = Router()
usersRouter.route('/')
    .get(authenticate, userController.getAll)

usersRouter.route('/:id')
    .get(authenticate, userController.getOne)
    .delete(authenticate, userController.delete)
    .put(authenticate, userController.update)    
    
    usersRouter.route('/logout')
    .post(authenticate, userController.logout)

