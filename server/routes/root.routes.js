import { Router } from "express";
import { userController } from "../controllers/users.controller.js";


export const routeRouter = Router()
routeRouter.route('/login')
    .post(userController.login)

routeRouter.route('/register')
    .post(userController.register)

