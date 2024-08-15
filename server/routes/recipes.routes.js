import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";

import { recipeController } from "../controllers/recipes.controller.js";
import { documentsController } from "../controllers/documents.controller.js";

import multer from 'multer'

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, process.cwd() + "\\documents");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

const uploads = multer({ storage: storage })

export const recipesRouter = Router()
recipesRouter.route('/')
    .post(authenticate, recipeController.create)
    .get(authenticate, recipeController.get)
    .put(authenticate, recipeController.update)
    
recipesRouter.route('/field')
    .put(authenticate, recipeController.updateField)

recipesRouter.route('/:id')
    .get(authenticate, recipeController.get)
    .delete(authenticate, recipeController.delete)

recipesRouter.route('/image')
    .post(authenticate, uploads.single('img'), recipeController.upload)

recipesRouter.route('/image/:fileName')
    .get(/*authenticate, */documentsController.download)    // TODO: figure out how to include authentication so only authenticated users can get pics
