import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   clerkUserId : {type : String , required : true , unique : true},
   email : {type : String , required : true},
   name : {type : String},
});


export default mongoose.model("User" , userSchema);


