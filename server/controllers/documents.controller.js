
export const documentsController = {
    // create
    // upload doc
    upload: async (req, res) => {
        console.log('got img: ', req.body)
        res.status(200).json({ status: 'files received' })
    },

    // read
    download: async (req, res) => {
        const { fileName } = req.params

        try {
            const file = `${process.cwd()}/documents/${fileName}`;
            res.status(200).download(file); // Set disposition and send it.
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}
