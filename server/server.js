import express from 'express';
import cors from 'cors';
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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Routes
app.use("/api", router);

// Database connection
dbConnect();

// Start the server
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);
