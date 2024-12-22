import { model,Schema } from "mongoose";


const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
      
      
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    dateOfBirth:{
        type: String,
        required:[true,"Date of Birth is required"]

    },
    phoneNumber:{
        type: Number,
        required:[true,"Date of Birth is required"],
        validate: {
            validator: v =>v.toString().length== 8,
            message: "Please enter your real phone number "
          }
    },
    Adress:{
      type:String,
      required:[true,"Adress is required"]
    }
  }, {timestamps: true});
  
  const User=model("User",UserSchema);
  export default User
  