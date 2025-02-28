import mongoose, { model,Schema } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
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
    },
    acctype:{
      type:String,
      enum: ['investor','startup', 'admin'],
      required:[true,"Account Type is required"],
      validate:{
          validator:(t) => ["investor","startup","admin"].includes(t),
          message:(props) => props.value+" is not a valid Account type"
      }
  },
  }, {timestamps: true});

  UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate("confirmPassword", "Passwords must match.");
    }
    next();
  });
  
  UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => next(err));
  });
  UserSchema.virtual("confirmPassword")
    .get(function () {
      return this._confirmPassword;
    })
    .set(function (value) {
      this._confirmPassword = value;
    });
  

  const User=model("User",UserSchema);
  export default User
  