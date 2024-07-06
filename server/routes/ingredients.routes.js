import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { ingredientsController } from "../controllers/ingredients.controller.js";

export const ingredientsRouter = Router()
ingredientsRouter.route('/')
    .post(authenticate, ingredientsController.create)
 
ingredientsRouter.route('/:id')
    .delete(authenticate, ingredientsController.delete)
    .put(authenticate, ingredientsController.update)

