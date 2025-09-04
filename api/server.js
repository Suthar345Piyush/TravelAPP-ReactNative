
import mongoose from "mongoose";
import express from "express";
import nodeMailer from "nodemailer";
import cors from "cors";
import axios from "axios";



const app = express();
const port = process.env.PORT || 3000;

import Trip from "./models/trip.js";
import User from "./models/user.js";



app.use(cors());
app.use(express.json());

const mongoUri = "mongodb+srv://piyush:<password>@cluster0.wabcbqp.mongodb.net/";
mongoose.connect(mongoUri).then(() => {
   console.log("Connected to mongoDb")
}).catch(err => {
   console.log("Mongodb connection error" , err);
   process.exit(1);
})


app.listen(port , () => {
   console.log("Server is running at port 3000");
})


app.get("/" , (req , res) => { 
   res.send("Trip Planner API");
});


app.post("/api/trips" , async(req , res) => {
    try{
       const {
          tripName,
          startDate,
          endDate,
          startDay,
          endDay,
          background,
          budget = 0,
          expenses = [],
          placesToVisit = [],
          itinerary = [],
          clerkUserId,
          userData={}
       } = req.body;


       if(!clerkUserId){
          return res.status(401).json({error : "User id is req"});
       };

       if(!tripName || !startDate || !endDate || !startDay || !endDay || !background){
          return res.status(400).json({error : "Missing required trip fields"});
       };

       let user = await User.findOne({clerkUserId});
       if(!user){
          const {email , name} = userData;
          if(!email){
             return res.status(400).json({error : "User email id required"});
          }
          user = new User({clerkUserId , email , name});
          await user.save();
       }

       const trip = new Trip({
          tripName,
          startDate,
          endDate,
          startDay,
          endDay,
          background,
          host : user._id,
          travelers : [user._id , ...travelers],
          budget,
          expenses,
          placesToVisit,
          itinerary,
       });

       await trip.save();
       res.status(201).json({message : "Trip created successfully!!"});

    } catch(error){
       console.log("Error" , error);
       res.status(500).json({error : "Failed to create trip"});
    }
});


app.get("/" , async(req , res) => {
    try {
        const {clerkUserId , email} = req.query;

        if(!clerkUserId){
          return res.status(401).json({error : "User id is req"});
        };

        let user = await User.findOne({clerkUserId});
        if(!user) {
           if(!email){
             return res.status(400).json({error : "User email is required"});
           }
           user = new User({clerkUserId , email : email.toString() , name:''});
           await user.save();
        }; 

        const trips = await Trip.find({
          $or : [{host : user._id },{travelers:user._id}],
        }).populate("host travelers")


        res.status(200).json({trips});  


    } catch(error){
        console.log("Error" , error);
        res.status(500).json({error : "Failed to fetch trip"});
    }
});






