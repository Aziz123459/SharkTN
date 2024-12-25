import mongoose, { model,Schema } from "mongoose";
import User from "./users.model.js"


const investorSchema = new Schema({
    businessRegistrationNumber: {
        type: String,
        required: true,
        validate: {
            validator: value => /^[0-9]{7}[A-Za-z]$/.test(value), // 7 digits followed by 1 letter
            message: 'Business Registration Number must be 7 digits followed by one letter.',
    },
    },
    investmentAmount: {
        type: Number,
        required: true,
      min: [500, 'Investment amount must be at least 500.'], // Minimum amount
    },
    message: {
        type: String,
        maxlength: 500, 
        trim: true,
    },
    userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref: User
            }
}, { timestamps: true }); 

const Investor = model('Investor', investorSchema);
export default Investor