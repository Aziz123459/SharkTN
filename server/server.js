import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import router from "./routes/users.routes.js"


const app = express();
const PORT = process.env.PORT;
dotenv.config();

// -- MIDDLEWARE --
app.use(express.json(), cors());
app.use("/api", router)

dbConnect();




app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

require('dotenv').config();
const jwt = require("jsonwebtoken");

const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

