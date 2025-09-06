import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from './HomeScreen';
import { useAuth, useUser } from '@clerk/clerk-expo';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from "@expo/vector-icons";





dayjs.extend(customParseFormat);


const GOOGLE_API_KEY = "abc";






const PlanTripScreen = () => {
  const navigation = useNavigation();
  const route  = useRoute<RouteProp<HomeStackParamList , "PlanTrip">>();

  const {trip : initialTrip} = route.params;
  const [trip , setTrip] = useState(initialTrip || {});
  const [showNotes , setShowNotes] = useState(true);

  const [showPlaces , setShowPlaces] = useState(true);
  const [selectedTab , setSelectedTab] = useState("Overview");
  const [modalVisible , setModalVisible] =  useState(false);
  const [modalMode , setModalMode] = useState<"place" | "expense" | "editExpense" | "ai">("place");

  const [activePlace , setActivePlace] = useState(null);
  const [selectedDate , setSelectedDate]  = useState<string | null>(null);
  const [expenses , setExpenses] = useState<any[]>(trip.expenses || []);
  const [editingExpense , setEditingExpense] = useState<any | null>(null);
  const [expenseForm , setExpenseForm] = useState({
     description : "",
     category : "",
     amount : "",
     paidBy : "Piyush Suthar",
     splitOption : "Don't Split",
  });

  const [openSplitDropdown , setOpenSplitDropdown] = useState(false);
  const [aiPlaces , setAiPlaces] = useState<any[]>([]);

  const [aiLoading , setAiLoading] = useState(false);

  const [error , setError] = useState<string | null>(null);
  const {getToken} = useAuth();
  const {user} = useUser();

  const categories = [
     "Flight",
     "Lodging",
     "Shopping",
     "Activities",
     "Sightseeking",
     "Drinks",
     "Food",
     "Transportation",
     "Entertainment",
     "Miscellaneous",
  ];

  const  splitOptions = [
     {label : "Don't Split" , value : "Don't Split"},
     {label : "Everyone" , value : "Everyone"},
  ];



  const fetchTrip = useCallback(async () => {
      try{
         const clerkUserId = user?.id;
         if(!clerkUserId || !trip._id){
            setError("User or trip ID is missing");
            return;           
         }

         const token = await getToken();

         const response = await axios.get(`http://localhost:3000/api/trips/${trip._id}` , {
           params : {clerkUserId},
           headers : {Authorization : `Bearer ${token}`},
         });

         setTrip(response.data.trip);
         setExpenses(response.data.trip.expense || []);
         setError(null);
      } 
        catch(error : any){
         console.error("Error fetching trip: " , error);
         setError(error.response?.data?.error || "Failed to fetch trip"); 
      }
  } , [trip._id , user]);




   useFocusEffect(useCallback(() => {
      fetchTrip();
   } , [fetchTrip]));




    //  fetching the open ai api responses 

   const fetchAIPlaces = async () => {
      setAiLoading(true);
      setError(null);

      try {
         const response = await axios.post(
           "",
           {
             model : "",
             messages : [
                {
                   role : "system",
                   content : `You are a travel assitant for ${trip.tripName || "a popular destination"}. Return a JSON array of 5 objects , each representing a top place to visit. Each object must have exactly these fields: "name" (string), "description" (string , 50-100 words), "address" (string). Ensure the response is valid JSON , with no backticks , markdown, or extra text. Example: [{"name" : "Place 1" , "description" : "A beautiful place..." , "address" : "123 Main St}]`, 
                },
                {
                   role: "user",
                   content : `List 5 top places to visit in ${trip.tripName || "a popular destination"} in JSON format.`,
                }
             ]
           },

           {
            headers : {
               Authorization : `Bearer token`,
               "Content-Type" : "application/json",
            },
           }
         );

         let content = response.data.choices[0].message.content.trim();
         content = content.replace(/```json\n?|\n?```/g, "");
         const jsonMatch = content.match(/\[.*\]/s);

         if(!jsonMatch) {
           throw new Error("No valid JSON array found in response");
         }

        content = jsonMatch[0];


        let places;
        try {
           places = JSON.parse(content);

        } catch (parseError) {
           console.error("JSON Parse error:" , parseError);
           throw new Error("Invalid JSON format in AI response");
        }

        if(!Array.isArray(places) || places.length === 0){
          throw new Error("AI response is not a valid array");
        }

        places.forEach((place) => {
          if(!place.name || !place.description || !place.address){
             throw new Error (
                "Ai response missing required fields (name, description , address)"
             );
          }
        });

      
      //   details of the place function 

      const placesWithDetails = await Promise.all(
            places.map(async (place : any) => {
                 try {
                   const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
                      `${place.name} , ${place.address}`
                   )}&inputtype=textquery&fields=place_id&key=${GOOGLE_API_KEY}`;

                   const findPlaceRes = await axios.get(findPlaceUrl);
                   const placeId = findPlaceRes.data.candidate?.[0]?.place_id;

                    if(!placeId){
                      throw new Error(`No place_id found for ${place.name}`);
                    }


                    const detailsUrl = ``;
                    const detailsRes = await axios.get(detailsUrl);
                    const d = detailsRes.data.result;


                    if(!d){
                      throw new Error(`No details found for ${place.name}`);
                    }


                    return  {
                      id : placeId,
                      name : d.name || place.name,
                      briefDescription:
                        d.editorial_summary?.overview?.slice(0 , 200) + "..." || place.description?.slice(0,200) + "..." || `Located in ${}`
                      
                    }




                 } catch(error){
                   
                 }
            })
      )




      } catch(errpr){
         
      }

   }

   




  return (
    <SafeAreaView className="flex-1 bg-white">
       <View className="relative w-full h-48">
          <Image className="w-full h-full" source={{uri : trip.background || "https://via.placeholder.com/150"}}/>

          <View className="absolute top-0 left-0 w-full h-full bg-black/30">
             <TouchableOpacity className="absolute bottom-[-32px] left-4 right-4 bg-white p-4 rounded-xl shadow-md flex-row justify-between itmes-center">
                <Ionicons name="arrow-back" color={"#000"} size={28}/>
             </TouchableOpacity>

             <View>
                <Text className='text-lg font-semibold'>
                   Trip to {trip?.tripName}</Text>
                <Text className="text-sm text-gray-500 mt-1">
                   {{trip.startDate ? dayjs(trip.startDate).format("MM D") : "N/A"}}
                   {{trip.endDate ? dayjs(trip.endDate).format("MM D") : "N/A"}}
                </Text>
             </View>

             <View>
               <Image source={{uri : user?.imageUrl || "https://randomuser.me/api/portrait/woman/1.jpg"}} className='w-8 h-8 rounded-full mb-1'/>

               <TouchableOpacity className="bg-black rounded-full px-3 py-1">
                    <Text className="text-white text-xs">Share</Text>
               </TouchableOpacity>
             </View>
             
          </View>

       </View>


       <View>
          {["Overview" , "Itinerary" , "Explore" , "$"].map((tab , index) => (
            <TouchableOpacity onPress={() => setSelectedTab(tab)} className={`mr-6 pb-2 ${
                selectedTab === tab ? "border-b-2 border-orange-500" : ""
            }`}  key={index}>

               <Text>{tab}</Text>
            </TouchableOpacity>
          ))}

       </View>

       {selectedTab === "Overview" && (
          <ScrollView>
            <View>
               <Text>Wanderlog level: <Text>Basic</Text></Text>
            </View>
          </ScrollView>
       )}
    </SafeAreaView>
  )
}

export default PlanTripScreen;

