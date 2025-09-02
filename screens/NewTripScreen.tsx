import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';



const NewTripScreen = () => {
   const [calendarVisible , setCalendarVisible] = useState(false);

   const [selectedRange , setSelectedRange] = useState<{
      startDate?:string;
      endDate?:string;
   }>({});

   const [displayStart , setDisplayStart] = useState("");
   const [displayEnd , setDisplayEnd] = useState("");
   const [searchVisible , setSearchVisible] = useState("");
   const [chosenLocation , setChosenLocation] = useState("");
   const navigation = useNavigation();


   const today = dayjs().format("YYYY-MM-DD");


   
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
     <View className="mt-2 mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Ionicons name="close" size={28} color={"#000"}/>
        </TouchableOpacity>
     </View>

     <Text className="text-2xl font-bold text-gray-900 mb-1">Plan a new Trip</Text>
     <Text className="text-base text-gray-500 mb-6">Build an itinerary and map for your upcoming travel plans</Text>

     <TouchableOpacity className="border border-gray-300 rounded-xl px-4 py-3 mb-4">
       <Text className="text-sm font-semibold text-gray-700 mb-1">Where to?</Text>

      <Text className="text-base text-gray-500">{chosenLocation || "E.g: Paris , Hawaii , Japan"}</Text>

     </TouchableOpacity>


     <TouchableOpacity>
      <View>
        <Text>Dates (optional)</Text>
        <View>
           <Ionicons name="calendar" color={"#000"} size={28}/>
           <Text>
             {displayStart ? dayjs(displayStart).format("MMM D") : "Start Date"}
           </Text> 
          </View>  
       </View>  
     </TouchableOpacity>


    </SafeAreaView>
  )
};


export default NewTripScreen;
