import { Ingredient } from "../models/ingredient.model.js";

export const ingredientsController = {
    // create
    create: async (req, res) => {
        Ingredient.create(req.body)
            .then(ingredient => {
                res.status(200).json(ingredient)
            })
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    // read
    // reads are all done through recipes    

    // update
    update: async (req, res) => {
        Ingredient.update(req.body, { where: { id: req.body.id } })
            .then(ingredient => res.status(200).json(ingredient))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    // delete
    delete: async (req, res) => {
        const { id } = req.params

        Ingredient.destroy({ where: { id: id } })
            .then(ingredient => res.status(200).json(ingredient))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    }
}
