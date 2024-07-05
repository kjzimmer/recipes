import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { authenticate } from "../config/jwt.config.js";


export const usersRouter = Router()
usersRouter.route('/')
    .get(authenticate, userController.get)

usersRouter.route('/:id')
    .get(authenticate, userController.get)
    .delete(authenticate, userController.delete)
    .put(authenticate, userController.update)

usersRouter.route('/logout')
    .post(authenticate, userController.logout)
