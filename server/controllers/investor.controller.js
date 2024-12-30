import investorSchema from '../models/investor.model.js';
import mongoose from "mongoose";

const InvestorController = {
    create: async (req, res) => {
        try {
            const newStartup = await investorSchema.create(req.body)
            res.json(newStartup)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    ReadAll: async (req, res) => {
        try {
            const AllStartups = await investorSchema.find()
            res.json(AllStartups)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    ReadOne: async (req, res) => {
        try {
            const OneStartup = await investorSchema.findById(req.params.id)
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
            const updatStartup = await investorSchema.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(updatStartup)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    DeleteOne: async (req, res) => {
        try {
            const DeleteOneStartup = await investorSchema.findByIdAndDelete(req.params.id)
            res.json({ response: " ok " })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    FindInverstorByUserId: async (req, res) => {
        try {
            const investor = await investorSchema.find({ userId: req.params.id }).exec();
            return res.json(investor)
        } catch (error) {
            console.error('Error fetching investor:', error);
        }    
    },
    getAllInvestors :async (req, res) => {
        try {
          const investors = await investorSchema.find(); // Fetch all investors
          res.json(investors); // Send investors as JSON response
        } catch (err) {
            console.error('Error fetching investors:', err);
            res.status(500).send('Server Error');
        }
    }
}

export default InvestorController