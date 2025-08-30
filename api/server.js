
import mongoose from "mongoose";
import express from "express";
import nodeMailer from "nodemailer";
import cors from "cors";
import axios from "axios";



const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const mongoUri = "mongodb+srv://piyush:Piyush@cluster0.wabcbqp.mongodb.net/";
mongoose.connect(mongoUri).then(() => {
   console.log("Connected to mongoDb")
}).catch(err => {
   console.log("Mongodb connection error" , err);
   process.exit(1);
})


app.listen(port , () => {
   console.log("Server is running at port 3000");
})




