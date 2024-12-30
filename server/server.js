import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dbConnect from './config/mongoose.config.js';
import router from "./routes/users.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// -- MIDDLEWARE --
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static('public/uploads'));

// Routes
app.use("/api", router);

// Database connection
dbConnect();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('sticker'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log(`File uploaded: ${req.file.filename}`);
    const filePath = req.file.path.replace('public/', '');
    res.status(200).send({ filePath });
});

// Start the server
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);
