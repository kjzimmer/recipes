import { Ingredient } from "../models/ingredient.model.js";
import { PrepStep } from "../models/prepStep.model.js";
import { Recipe } from "../models/recipe.model.js";

export const recipeController = {
    // create
    create: async (req, res) => {
        Recipe.create(req.body)
            .then(recipe => {
                res.status(200).json(recipe)
            })
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    // read
    get: async (req, res) => {
        const { id } = req.params

        if (id) {
            Recipe.findByPk(id, {
                include:[{
                    model:Ingredient,
                    as:'ingredients'
                },{
                    model: PrepStep,
                    as: 'prepSteps'
                }]
            })
                .then(recipe => {
                    res.status(200).json(recipe)
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).json(error)
                })
        } else {
            Recipe.findAll()
                .then(recipes => res.status(200).json(recipes))
                .catch(error => {
                    console.log(error)
                    res.status(400).json(error)
                })
        }
    },

    // update
    update: async (req, res) => {
        Recipe.update(req.body, { plain: true,  where: { id: req.body.id } })
            .then(recipe => res.status(200).json(req.body)) // could not get plain:true or returning:true to work.  to return the record saved just return the input to the update
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    // delete
    delete: async (req, res) => {
        console.log('in delete controller')
        // TODO: arrange a means to deal with cases where the user is refferenced by othe tables
        // need to either delete the refference or keep the user but mark them in active
        const { id } = req.params

        Recipe.destroy({ where: { id: id } })
            .then(recipe => res.status(200).json(recipe))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    }
}
