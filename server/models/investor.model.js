import { model,Schema } from "mongoose";


const investorSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        validate: {
        validator: value => /^[a-zA-Z\s]+$/.test(value), // Only alphabets and spaces
        message: 'Full Name must only contain alphabets and spaces.',
    },
    },
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
}, { timestamps: true }); 

const Investor = model('Investor', investorSchema);
export default Investor