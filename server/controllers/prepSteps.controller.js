import { PrepStep } from "../models/prepStep.model.js";

export const prepStepsController = {
    // create
    create: async (req, res) => {
        PrepStep.create(req.body)
            .then(step => {
                res.status(200).json(step)
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
        PrepStep.update(req.body, { where: { id: req.body.id } })
            .then(step => res.status(200).json(step))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    // delete
    delete: async (req, res) => {
        const { id } = req.params

        PrepStep.destroy({ where: { id: id } })
            .then(step => res.status(200).json(step))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    }
}
