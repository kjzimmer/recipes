import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { prepStepsController } from "../controllers/prepSteps.controller.js";

export const prepStepsRouter = Router()
prepStepsRouter.route('/')
    .post(authenticate, prepStepsController.create)
    .put(authenticate, prepStepsController.update)

prepStepsRouter.route('/:id')
    .delete(authenticate, prepStepsController.delete)

