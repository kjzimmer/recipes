import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { recipeController } from "../controllers/recipes.controller.js";

export const recipesRouter = Router()
recipesRouter.route('/')
    .get(authenticate, recipeController.get)
    // .post(authenticate, recipeController.create)
    .post(authenticate, recipeController.create)
 
recipesRouter.route('/:id')
    .get(authenticate, recipeController.get)
    .delete(authenticate, recipeController.delete)
    .put(authenticate, recipeController.update)

