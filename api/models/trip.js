import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
   date : {type : String , required : true},
   name : {type : String , required : true},
   phoneNumber : {type : String},
   website : {type : String},
   openingHours : [String],
   photos : [String],
   reviews : [{
     authorName : String,
     rating : Number,
     text : String,
   }],
   types : [String],
   formatted_address : {type : String , required : true},
   briefDescription : {type :String},
   geometry : {
     location : {
       lat : {type : Number , required : true},
       lng : {type : Number , required : true},
     },
     viewport :{ 
       northeast : {
         lat : {type : Number , required : true},
         lng : {type : Number , required : true},
       },
       southwest : {
         lat : {type : Number , required : true},
         lng : {type : Number , required : true},
       }
     }
   },
});


const itinerarySchema = new mongoose.Schema({
   date : {type : String , required : true},
   activities : [activitySchema],
});


const placeSchema = new mongoose.Schema({
   name : {type : String , required : true},
   phoneNumber : {type : String},
   website : {type : String},
   openingHours : [String],
   photos : [String],
   reviews : [
     {
       authorName : String,
       rating : Number,
       text : String,
     },
   ],
   types : [String],
   formatted_address : {type : String , required : true},
   briefDescription : {type : String},
   geometry : {
     location : {
       lat : {type : Number , required : true},
       lng : {type : Number  , required : true },
     },
     viewport : {
      northeast : {
         lat : {type : Number , required : true},
         lng : {type : Number , required : true},
      },
      southwest : {
         lat : {type : Number , required : true},
         lng : {type : Number , required : true},
      }
     }
   },
});


const expenseSchema = new mongoose.Schema({
   category : {type : String , required : true},
   price : {type : Number , required : true},
   splitBy : {type : String , required : true},
   paidBy : {type : String , required : true},
});


const tripSchema = new mongoose.Schema({
   tripName : {type : String , required : true},
   startDate : {type : String , required : true},
   endDate : {type : String , required : true},
   startDay : {type : String , required : true},
   endDay : {type : String , required : true},
   background : {type : String , required : true},
   host : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
   travelers : [{type : mongoose.Schema.Types.ObjectId , ref : "User"}],
   budget : {type : Number , default : 0},
   expenses : [expenseSchema],
   placesToVisit : [placeSchema],
   itinerary : [itinerarySchema],
   createdAt : {type : Date , default : Date.now},
});



export default  mongoose.model("Trip" , tripSchema);







