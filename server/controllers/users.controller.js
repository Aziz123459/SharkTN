import UserSchema from '../models/users.model.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const UserController = {
    // create: async (req, res) => {
    //     try {
    //         const newUser = await UserSchema.create(req.body)
    //         res.json(newUser)
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).json(err)
    //     }
    // },
    ReadAll: async (req, res) => {
        try {
            const AllUsers = await UserSchema.find()
            res.json(AllUsers)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    ReadOne: async (req, res) => {
        try {
            const OneUser = await UserSchema.findById(req.params.id)
            res.json(OneUser)
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
            const updateUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(updateUser)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    DeleteOne: async (req, res) => {
        try {
            const DeleteOneUser = await UserSchema.findByIdAndDelete(req.params.id)
            res.json({ response: " ok " })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    login: async(req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }
    
        try {
            const user = await UserSchema.findOne({ email: req.body.email });
    
            if (user === null) {
                return res.status(400).json({ msg: "Email not found" });
            }
    console.log("****", user.password);
    console.log("======", req.body.password);
    
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
            console.log(correctPassword);
            if (!correctPassword) {
                
                return res.status(400).json({ msg: "Incorrect password" });
            }
    
            const userToken = jwt.sign(
                { id: user._id },
                process.env.SECRET_KEY,
                { expiresIn: '24h' } 
            );
    
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .json({ msg: "success!", user: { firstName: user.firstName, lastName: user.lastName } });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Server error", error: err.message });
        }
    },
    register: (req, res) => {
        UserSchema.create(req.body)
          .then(user => {const userToken = jwt.sign({id: user._id }, process.env.SECRET_KEY);

              res.cookie("userToken", userToken).json({ msg: "success registration!", user: user });
              console.log(userToken)
          })
          .catch(err => res.status(400).json(err));
      },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}

export default UserController