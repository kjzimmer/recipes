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
            Recipe.findByPk(id)
                .then(recipe => res.status(200).json(recipe))
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
        // QUESTION: include the id in the req body then it's not needed in the address url
        const { id } = req.params

        Recipe.update(req.body, { where: { id: id } })
            .then(recipe => res.status(200).json(recipe))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    // delete
    delete: async (req, res) => {
        // TODO: arrange a means to deal with cases where the user is refferenced by othe tables
        // need to either delete the refference or keep the usere but mark them in active
        const { id } = req.params

        Recipe.destroy({ where: { id: id } })
            .then(recipe => res.status(200).json(recipe))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    }
}
