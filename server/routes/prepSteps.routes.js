import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { prepStepsController } from "../controllers/prepSteps.controller.js";

export const prepStepsRouter = Router()
prepStepsRouter.route('/')
    .post(authenticate, prepStepsController.create)

prepStepsRouter.route('/:id')
    .put(authenticate, prepStepsController.update)
    .delete(authenticate, prepStepsController.delete)

