import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { recipeController } from "../controllers/recipes.controller.js";

export const recipesRouter = Router()
recipesRouter.route('/')
    .post(authenticate, recipeController.create)
    .get(authenticate, recipeController.get)
 
recipesRouter.route('/:id')
    .get(authenticate, recipeController.get)
    .put(authenticate, recipeController.update)
    .delete(authenticate, recipeController.delete)

