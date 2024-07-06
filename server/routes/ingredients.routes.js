import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { ingredientsController } from "../controllers/ingredients.controller.js";

export const ingredientsRouter = Router()
ingredientsRouter.route('/')
    .post(authenticate, ingredientsController.create)
 
ingredientsRouter.route('/:id')
    .put(authenticate, ingredientsController.update)
    .delete(authenticate, ingredientsController.delete)

