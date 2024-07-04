import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { authenticate } from "../config/jwt.config.js";
import { recipeController } from "../controllers/recipes.controller.js";


export const baseRouter = Router()
baseRouter.route('/login')
    .post(userController.login)

baseRouter.route('/register')
    .post(userController.register)

export const usersRouter = Router()
usersRouter.route('/')
    .get(authenticate, userController.get)

usersRouter.route('/:id')
    .get(authenticate, userController.get)
    .delete(authenticate, userController.delete)
    .put(authenticate, userController.update)

usersRouter.route('/logout')
    .post(authenticate, userController.logout)

export const recipesRouter = Router()
recipesRouter.route('/')
    .get(authenticate, recipeController.get)
    .post(authenticate, recipeController.create)
 
recipesRouter.route('/:id')
    .get(authenticate, recipeController.get)
    .delete(authenticate, recipeController.delete)
    .put(authenticate, recipeController.update)

