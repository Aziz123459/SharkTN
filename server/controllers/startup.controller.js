import StartUpSchema from '../models/startup.model.js';

const StartupController = {
    create: async (req, res) => {
        try {
            const newStartup = await StartUpSchema.create(req.body)
            res.json(newStartup)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    ReadAll: async (req, res) => {
        try {
            const AllStartups = await StartUpSchema.find()
            res.json(AllStartups)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    ReadOne: async (req, res) => {
        try {
            const OneStartup = await StartUpSchema.findById(req.params.id)
            res.json(OneStartup)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    update: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        }
        try {
            const updatStartup = await StartUpSchema.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(updatStartup)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    DeleteOne: async (req, res) => {
        try {
            const DeleteOneStartup = await StartUpSchema.findByIdAndDelete(req.params.id)
            res.json({ response: " ok " })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}

export default StartupController