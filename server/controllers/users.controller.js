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
    updateUser : async (req, res) => {
        const allowedUpdates = ['firstName', 'lastName', 'dateOfBirth', 'phoneNumber'];
        const updates = Object.keys(req.body);
    
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
    
        try {
            const userId = req.user.id; // Assuming user ID is in the request
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).send();
            }
    
            updates.forEach((update) => {
                user[update] = req.body[update];
            });
    
            await user.save();
            res.send(user);
        } catch (e) {
            res.status(400).send(e);
        }
    },
    
    DeleteOne: async (req, res) => {
        try {
            const DeleteOneUser = await UserSchema.findByIdAndDelete(req.params.id)
            console.log("*******************",res)
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
    
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
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
                .json({ msg: "success!", user: user,token:userToken });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Server error", error: err.message });
        }
    },
    register: async (req, res) => {
        try {
            // Check if the email already exists
            const existingUser = await UserSchema.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ msg: "Email already exists." });
            }
    
            // Create a new user
            const user = await UserSchema.create(req.body);
    
            // Generate a JWT token
            const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    
            // Set the token as a cookie and respond with success
            res.cookie("userToken", userToken).json({
                msg: "Success registration!",
                user: user,
                token: userToken,
            });
    
            console.log(userToken);
        } catch (err) {
            // Handle errors
            res.status(400).json(err);
        }
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.status(200).json({ message: 'Logout successful' });
    }
}

export default UserController