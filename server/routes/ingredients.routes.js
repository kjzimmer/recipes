import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { ingredientsController } from "../controllers/ingredients.controller.js";

export const ingredientsRouter = Router()
ingredientsRouter.route('/')
    .post(authenticate, ingredientsController.create)
    .put(authenticate, ingredientsController.update)
 
ingredientsRouter.route('/:id')
    .delete(authenticate, ingredientsController.delete)

