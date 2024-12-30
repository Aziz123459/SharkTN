import StartUpSchema from '../models/startup.model.js';
import mongoose from "mongoose";

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
    ReadOneByUser: async (req, res) => {
        try {
            const OneStartup = await StartUpSchema.findOne({ userId: req.params.userId })
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
    },
    FindStartupByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
    
            // Validate ObjectId format
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid userId format' });
            }
    
            // Convert to ObjectId
            const objectId = new mongoose.Types.ObjectId(userId);
    
            // Find the startup
            const startup = await StartUpSchema.findOne({ userId: objectId }).exec();
    
            if (!startup) {
                return res.status(404).json({ message: 'Startup not found' });
            }
    
            return res.json(startup);
        } catch (error) {
            console.error('Error fetching startup:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    getAllStartups :async (req, res) => {
        try {
          const startups = await StartUpSchema.find(); // Fetch all startups
          res.json(startups); // Send startups as JSON response
        } catch (err) {
            console.error('Error fetching startups:', err);
            res.status(500).send('Server Error');
        }
    }
}

export default StartupController