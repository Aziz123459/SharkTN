import UserSchema from '../models/users.model.js';

const UserController = {
    create: async (req, res) => {
        try {
            const newUser = await UserSchema.create(req.body)
            res.json(newUser)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
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
        const user = await UserSchema.findOne({ email: req.body.email });
    
        if(user === null) {
            return res.sendStatus(400);
        }
    
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
        if(!correctPassword) {
            return res.sendStatus(400);
        }
    
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
    
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    },
    register: (req, res) => {
        UserSchema  .create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
        
                res
                    .cookie("usertoken", userToken, secret, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
        },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
    
    
}

export default UserController