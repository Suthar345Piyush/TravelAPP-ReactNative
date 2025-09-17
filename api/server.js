import mongoose from "mongoose";
import express from "express";
import nodemailer from "nodemailer";
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
});



app.listen(port , () => {
   console.log("Server is running at port 3000");
});


// node mailer setup in the server.js file  

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
       user : "",
       pass : "",
    },
});


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
          return res.status(401).json({error : "User id is required"});
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
          return res.status(401).json({error : "User id is required"});
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



app.post("/api/send-email" , async(req , res) => {
    try{
        const {email , subject , message} = req.body;
        if(!email || !subject , !message){
          return res.subject(400).json({error : "Email , subject and message is required"});
        };

        const mailOptions = {
           from : "",
           to : email,
           subject : subject,
           text : message,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({message : "Mail sent successfully"});


    } catch(error) {
         console.log("Error" , error);
         res.status(500).json({error : "Failed to send Email"});
    }
});



app.post("/api/trips/:tripId/places" , async (req , res) => {
    try {
       const {tripId} = req.params;
       const {placeId} = req.body;
       const API_KEY = 'abc';
       if(!placeId){
           return res.status(400).json({error : "Place Id is required"});
       }

       const trip = await Trip.findById(tripId);

       if(!trip){
          return res.status(404).json({error : "Trip not found"});
       }

       const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;

       const response = await axios.get(url);
       const {status , result : details} = response.data;

       if(status !== 'OK' || !details){
          return res.status(400).json({error : `Google Places API error: ${status}`});
       }

       const placeData = {
          name : details.name || 'Unknown Place',
          phoneNumber : details.formatted_phone_number || '',
          website : details.website || '',
          openingHour : details.opening_hour?.weekday_text || [],
          photos: details.photos?.map(
             photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
          ) || [],
          reviews : details.reviews?.map(review => ({
             authorName : review.author_name || 'Unknown',
             rating : review.rating || 0,
             text : review.text || '',
          })) || [],

          types : details.types || [],
          formatted_address :  details.formatted_address || "No address available",
          briefDescription : 
             details?.editorial_summary?.overview?.slice(0, 200) + "..." || 
             details?.review?.[0]?.text?.slice(0, 200) + "..." || 
             `Located in ${details.address_components?.[2]?.long_name || details.formatted_address || "this area"}. A nice place to visit.`,

             geometry : {
                location : {
                   lat : details.geometry?.location?.lat || 0,
                   lng : details.geometry?.location?.lng || 0,
                },

                viewport : {
                   northeast : {
                      lat : details.geometry?.viewport?.northeast?.lat || 0,
                      lng : details.geometry?.viewport?.northeast?.lng || 0,
                   },
                   southwest : {
                      lat : details.geometry?.viewport?.southwest?.lat || 0,
                      lng : details.geometry?.viewport?.southwest?.lng || 0,
                   }
                }
             }
       };


       const updatedTrip = await Trip.findByIdAndUpdate(
         tripId,
         {$push : {placesToVisit : placeData}},
         {new : true}
       );

       res.status(200).json({message : "Place added successfully" , trip : updatedTrip});

    } catch(error){
        console.log("Error" , error);
        res.status(500).json({error : "Failed to add place to trip"});
    }
});











