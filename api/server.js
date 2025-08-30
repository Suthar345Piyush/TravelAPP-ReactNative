import express from "express";
import mongoose from "mongoose";
import nodeMailer from "nodemailer";
import cors from "cors";
import axios from "axios";
import App from "../App";


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const mongoUri = "mongodb+srv://piyush:Piyush@cluster0.wabcbqp.mongodb.net/";
mongoose.connect()



