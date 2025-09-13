import { Image,  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from './HomeScreen';
import { useAuth, useUser } from '@clerk/clerk-expo';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios, { isAxiosError } from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import  Modal  from "react-native-modal"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



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


   // function for adding  expenses 

   const handleAddExpense = () => {
       if(!expenseForm.description || !expenseForm.category || !expenseForm.amount){
          setError("Please fill all the expenses field's first");
          return;
       }


      //   for adding some new expenses 
      const newExpense = {
          id : Date.now().toString(),
          ...expenseForm,
          price : parseFloat(expenseForm.amount),
          date : dayjs().format("YYYY-MM-DD"),
      };

   // having those attributes in the expense form 

      setExpenses((prev) => [...prev , newExpense]);
       setExpenseForm({
         description : "",
         category : "",
         amount : "",
         paidBy : "Piyush Suthar",
         splitOption : "Don't Split",
       });
       setModalVisible(false);
       setModalMode("place");
   };


   // function to edit expenses 

   const handleEditExpense = () => {
       if(!editingExpense || !expenseForm.description || !expenseForm.category || !expenseForm.amount) {
          setError("Please fill all the expenses field's first");
          return;
       }

       setExpenses((prev) => 
        prev.map((expense) => expense.id === editingExpense.id ? {
          ...expense,
          ...expenseForm,
          price : parseFloat(expenseForm.amount),
        } : expense));

        setExpenseForm({
         description : "",
         category : "",
         amount : "",
         paidBy : "Piyush Suthar",
         splitOption : "Don't Split",
        });
        setEditingExpense(null);
        setModalVisible(false);
        setModalMode("place");
   };


   // function for deleting the expenses 

   const handleDeleteExpense = (id : string) => {
       setExpenses((prev) => prev.filter((expense) => expense.id !== id));
   };

   // function for the generate trip dates 

   const generateTripDates = () => {
       const start =  dayjs(trip.startDate || new Date());
       const end =  dayjs(trip.endDate || new Date());
       const days = [];


       for(let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1 , "day")){
          days.push(d);
       }

       return days.map((d) => ({
          label : d.format("ddd D/M"),
          value : d.format("YYYY-MM-DD"),
       }));
   };


   








  const renderPlaceCard = (place :any , index : number , isItinerary : boolean = false) => {
    const isActive = activePlace?.name === place.name;
     return (
       <View key={index} className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
         <TouchableOpacity onPress={() => setActivePlace(isActive ? null : place)} className="flex-row items-center">

            <Image source={{uri : place.photos?.[0] || "https://via.placeholder.com/150"}}
             className="w-24 h-24 rounded-l-xl" resizeMode='cover'
            />

            <View className="flex-1 p-3">
                 <Text className="text-gray-800 font-bold text-base mb-1">
                   {place.name || "Unknown Place"}
                 </Text>
                 <Text className="text-gray-600 text-sm leading-5" numberOfLines={2}>
                   {place.briefDescription || "No Description is available"}
                 </Text>
                 <View className="flex-row items-center mt-1">
                    {renderStars(getAverageRating(place.reviews))}
                    <Text className="text-xs text-gray-500 ml-1">
                       ({getAverageRating(place.review)}/5)
                    </Text>
                 </View>
            </View>
         </TouchableOpacity>


         {isActive && (
             <View className="p-4 bg-gray-50 border-t border-gray-200">
               <View className="mb-4">
                  <View className="flex-row items-center">
                     <Ionicons name="location" size={16} color="#4B5563"/>
                      <Text className="text-sm font-semibold text-gray-700 ml-1">
                     Address
                      </Text>
                     </View>
                     <Text className="text-sm text-gray-600 mt-1">
                        {place.formatted_address || "No address available"}
                     </Text>
                  </View>


                  {place.openingHours?.length > 0 && (
                      <View className="mb-4">
                        <View className="flex-row items-center">
                           <Ionicons name="time" size={16} color="4B5563"/>
                           <Text className="text-sm font-semibold text-gray-700 mlinant">
                              Today's Hours
                           </Text>
                           </View>
                           <Text className="text-sm text-gray-600 mt-1">{
                              getCurrentDayHours(place.openingHours)
                           }</Text>
                        </View>
                  )}

                  {place.phoneNumber  && (
                      <View className="mb-4">
                        <View className="flex-row items-center">
                              <Ionicons name="call" size={16} color="4B5563"/>
                              <Text className="text-sm font-semibold text-gray-700 ml-1">
                                 Phone
                              </Text>
                           </View>
                           <Text className="text-sm text-gray-600 mt-1">
                              {place.phoneNumber}
                           </Text>
                        </View>
                  )}

                  {place.website && (
                      <View className="mb-4">
                      <View className="flex-row items-center">
                            <Ionicons name="globe" size={16} color="4B5563"/>
                            <Text className="text-sm font-semibold text-gray-700 ml-1">
                               Website
                            </Text>
                         </View>
                         <Text className="text-sm text-gray-600 mt-1" numberOfLines={1}>
                            {place.website}
                         </Text>
                      </View>
                  )}


                  {place.reviews?.length > 0 && (
                      <View className="mb-4">
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={16} color="4B5563"/>
                            <Text className="text-sm font-semibold text-gray-700 ml-1">Review</Text>
                           </View>
                           <Text className="text-sm text-gray-600 italic mt-1">
                              "{place.reviews[0].text.slice(0 , 100)}
                               {place.reviews[0].text.length > 100 ? "..." : ""}"
                           </Text>
                           <View className="flex-row items-center mt-1">
                               {renderStars(place.reviews[0].rating)}
                               <Text className="text-xs text-gray-500 ml-1">
                              - {place.reviews[0].authorName}{(place.reviews[0].rating)/5}
                               </Text>
                              </View>
                        </View>
                  )}

                  {place.types?.length > 0 && (
                      <View>
                        <View className="flex-row items-center">
                           <Ionicons name="pricetag" size={16} color="4B5563"/>
                           <Text className="text-sm font-semibold text-gray-700 ml-1">
                              Categories
                           </Text>
                           </View>
                           <View className="flex-row flex-wrap mt-1">
                              {renderPlaceTypes(place.types)}
                        </View>
                    </View>
                  )}
             </View>
         )}
       </View>
     )
  };



  const handleAddPlace = async ( data : any) => {
      try {
          const placeId = data.place_id;
          if(!placeId || !trip._id){
             setError("Place or trip ID missing");
             return;
          }


          const token = await getToken();
          await axios.post(
              `http://localhost:3000/api/trips/${trip._id}/places`,
              {placeId},
              {headers : {Authorization : `Bearer ${token}`}}
          );

          await fetchTrip();
          setModalVisible(false);
          setSelectedDate(null);
      } catch(error : any){
          console.error("Error adding place: " , error);
          setError(error.response?.data?.error || "Failed to add place");
      }
  };

   //  function for the adding place to itinerary 

   const handlePlaceToItinerary =  async (place : any  , date : string) =>  {
       try {
         if(!trip._id || !date){
             setError("Trip Id or date is missing");
             return;
         }

         const token = await getToken();
         const payload = place.id || place.place_id ? {
             placeId : place.id || place.place_id , date 
         } : {
             placeData : place , date
         };


         await axios.post(
             `http://localhost:3000/api/trips/${trip._id}/itinerary`,
             payload, {
               headers : {Authorization : `Bearer ${token}`}
             }
         );

         await fetchTrip();
         setModalVisible(false);
         setSelectedDate(null);
       }catch (error : any) {
         console.error("Error adding place to itinerary:" , error);
         setError(error.response?.data?.error || "Failed to add place to itinerary");
       }
   };




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
          <ScrollView className='px-4 pt-4'>
            <View className="mb-6 bg-white rounded-lg p-4">
               <Text className="text-sm text-gray-500 mb-1">Wanderlog level: <Text>Basic</Text></Text>

               <View className="w-full h-2 bg=gray-200 rounded-full overflow-hidden">
                  <View className="w-1/4 h-full bg-blue-500"/>
               </View>
            </View>

            <View className="flex-row justify-between mb-6">
               {[
                  {
                     title : "Add a reservation",
                     subtitle : "Forward an email or add reservation details",
                  },
                  {
                      title : "Explore things to do",
                      subtitle : "Add places from top blogs",
                  }
               ].map((card , index) => (
                <View key={index} className="w-[48%] bg-white p-4 rounded-lg shadow-sm">
                  <Text className="font-semibold mb-2 text-sm">{card.title} </Text>
                   <Text className="text-xs text-gray-500 mb-3">{card.subtitle}</Text>
                     <View className="flex-row justify-between">
                       <Text className="text-blue-500 text-xs font-medium">Skip</Text>
                       <Text className="text-blue-500 text-xs font-medium">Start</Text>
                  </View>
               </View>
               ))}
            </View>

            <View className="mb-6 bg-white rounded-lg p-4">
             <Text className="font-semibold mb-3 text-base">Reservations and attachments</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  {label : "Flight" , icon: "airplane"},
                  { label : "Lodging" , icon : "bag" },
                  {label : "Rental Car" , icon: "car"},
                  {label : "Restaurant" , icon : "restaurant"},
                  {label : "Attachments" , icon : "attach"},
                  {label : "Other" , icon : "ellipsis-horizontal"},
                ].map((item , index) => (
                   <View key={index} className="items-center mr-6">
                      <Ionicons name={item.icon as any} size={24}/>
                      <Text className="text-xs mt-1">{item.label}</Text>
                   </View>
                ))}
              </ScrollView>
            </View>

            <View className="border-t border-gray-200 bg-white">
                <TouchableOpacity onPress={() => setShowNotes(!showNotes)} className="p-4 flex-row ">  
                  <Text>Notes</Text>
                  <Ionicons name={showNotes ? "chevron-up" : "chevron-down"} color={"gray"} size={20}/>
                </TouchableOpacity>
                {showNotes && (
                     <View className="px-4 pb-4">
                         <Text className="font-semibold text-sm text-gray-500">
                           Write or paste general notes here, e.g. how to get around, local tips , reminders
                         </Text>
                     </View>
                  )}
            </View>


            <View className="border-t border-gray-200 bg-white">
                <TouchableOpacity onPress={() => setShowPlaces(!showPlaces)} className="p-4 flex-row ">  
                  <Text>Places to Visit</Text>
                  <Ionicons name={showNotes ? "chevron-up" : "chevron-down"} color={"gray"} size={20}/>
                </TouchableOpacity>
                {showPlaces && (
                     <View className="px-4 pb-4">
                        {(trip?.placesToVisit || []).map((place:any , index:number) => 
                          renderPlaceCard(place , index)
                        )}


                        {(!trip?.placesToVisit || trip.placesToVisit.length == 0) && (
                           <Text className='text-sm text-gray=500'>No Places added yet</Text>
                        )}
                        <TouchableOpacity className='border border-gray-300 rounded-lg px-4 py-2 mt-2'>
                           <Text className="text-sm text-gray-500">
                             Add a place
                           </Text>
                        </TouchableOpacity>
                     </View>
                  )}
            </View>
          </ScrollView>
       )}


     {/* side icons like ai chat and maps like things  */}

       <View className='absolute right-4 bottom-20 space-y-3 items-end'>
          <TouchableOpacity onPress={() => navigation.navigate("AIChat" , {
             location : trip.tripName || "Unknown"
          })}
          className="w-12 h-12 rounded-full bg-gradien-to-tr from-pink-400 to bg-purple-600 items-center justify-center shadow">
            <MaterialIcons name="auto-awesome" size={24} color="#fff"/>
          </TouchableOpacity>


          <TouchableOpacity className="w-12 h-12 rounded-full bg-black items-center justify-center shadow mt-2">
            <Ionicons name="map" size={24} color="#fff"/>
          </TouchableOpacity>


          <TouchableOpacity className="w-12 h-12 rounded-full bg-black  items-center justify-center shadow mt-2">
            <Ionicons name="add" size={24} color="#fff"/>
          </TouchableOpacity>
       </View>


        <Modal isVisible={modalVisible}  onBackdropPress={() => {
          setModalVisible(false);
          setSelectedDate(null);
          setModalMode("place");

      



        }}>
         {modalMode == "place" || modalMode == "ai"} ? (
            <>
             <Text>
                {selectedDate ?  `Add Place to ${dayjs(selectedDate).format("ddd D/M")}` : "Search for the Places"}
             </Text>


             {modalMode === "place" && (
                <GooglePlacesAutocomplete placeholder='Search for a Place'
                 fetchDetails={true}
                 enablePoweredByContainer={false}
                 onPress={async (data , details = null) => {
                   try {
                     const placeId = data.place_id;
                     const url =  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
                     const res = await fetch(url);
                     const json = await res.json();

                     if(json.status !== " OK" || !json.result){
                         throw new Error(`Google places api error ${json.status || "No res found"}`);
                     }


                     const d = json.result;
                     const place = {
                         id : placeId,
                         name : d.name || "Unknown Place",
                         briefDescription : d.editorial_summary?.overview?.slice(0 , 200) + "..." || 
                         d.reviews?.[0]?.text?.slice(0 , 200) + "..." || 
                         `Located in ${
                           d.address_components?.[2]?.long_name || 
                           d.formatted_address || "this area"
                         }. A nice place to visit.`,

                         photos : 
                           d.photos?.map(
                              (photo : any) => 
                              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
                           ) || [],
                           formatted_address:
                             d.formatted_address || "No address available",
                             openingHours: d.opening_hours?.weekday_text || [],
                             phoneNumber : d.formatted_phone_number || "",
                             website : d.website || "",
                             geometry : d.geometry || {
                               location : {lat : 0 , lng : 0},
                                viewport : {
                                  northeast : {lat : 0 , lng : 0},
                                  southwest : {lat : 0 , lng : 0},
                                },
                             },
                             types : d.types || [],
                             reviews : 
                               d.reviews?.map((review : any) => ({
                                  authorName : review.author_name || "Unknown",
                                  rating : review.rating || 0,
                                  text : review.text || "",
                               })) || [],
                     };

                     if(selectedDate){
                        await handlePlaceToItinerary(place , selectedDate)
                     } else {
                         await handleAddPlace(data);
                     }
                   } catch(error){
                      console.log("Error" , error);
                   }
                 }}
                  query={{
                      key : GOOGLE_API_KEY,
                      language="en",
                      }}
                      
                      styles={{
                         container : {flex : 0},
                         textInputContainer : {
                            flexDirection : "row",
                            backgroundColor : "#f1f1f1",
                            borderRadius : 30,
                            paddingHorizontal : 10,
                            alignItems : "center",
                         },
                          textInput : {
                            flex : 1,
                            height : 44,
                            color : "#333",
                            fontSize : 16,
                            backgroundColor : "#f1f1f1",
                            borderRadius : 25,
                          },
                          
                          listView : {
                            marginTop : 10,
                            backgroundColor : "#fff",
                          }
                      }}>

                </GooglePlacesAutocomplete>
             )}
            </>
         ) : (
             
         )

        </Modal>




       
    </SafeAreaView>
  )
}

export default PlanTripScreen;




