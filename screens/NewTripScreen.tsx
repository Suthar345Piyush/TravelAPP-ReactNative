import { Modal, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import {Calendar , DateObject} from "react-native-calendars";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth , useUser } from '@clerk/clerk-expo';
import {useTrip} from "../context/TripContext";

 


const NewTripScreen = () => {
   const [calendarVisible , setCalendarVisible] = useState(false);

   const [selectedRange , setSelectedRange] = useState<{
      startDate?:string;
      endDate?:string;
   }>({});

   const [displayStart , setDisplayStart] = useState<string>("");

   const [displayEnd , setDisplayEnd] = useState<string>("");

   const [searchVisible , setSearchVisible] = useState("");

   const [chosenLocation , setChosenLocation] = useState<string | null>("");

   const [isLoading , setIsLoading] = useState(false);


   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

   const {addTrip} = useTrip();

   const [error , setError] = useState<string | null>("");
   
   const {getToken} = useAuth();

   const {user} = useUser();


   const today = dayjs().format("YYYY-MM-DD");


   const handleDayPress = (day : DateObject) => {
      const selected = day.dateString;


      if(
         !selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)
      ) {
         setSelectedRange({startDate : selected});
      } else if(
         selectedRange.startDate && dayjs(selected).isAfter(selectedRange.startDate)
      ) {
         setSelectedRange({
           ...selectedRange,
           endDate : selected,
         })
      }
   };


   const getMarkedDates = () => {
      const marks : any = {};

      const {startDate , endDate} = selectedRange;
      if(startDate && !endDate) {
         marks[startDate] = {
           startingDay : true,
           endingDay : true,
           color : "#FF5722",
           textColor : "white",
         };
      }  else if(startDate && endDate){
         let curr = dayjs(startDate);
         const end = dayjs(endDate);


         while(curr.isBefore(end) || curr.isSame(end)){
           const formatted = curr.format("YYYY-MM-DD");
           marks[formatted] = {
              color : "#FF5277",
              textColor : "white",
              ...(formatted === startDate && {startingDay : true}),
              ...(formatted === endDate && {endingDay : true}),
           };
           curr = curr.add(1 , "day");
         }
      }
      return marks;
   };


    // date saving function 
    
    const onSaveDates = () => {
       if(selectedRange.startDate) setDisplayStart(selectedRange.startDate);
       if(selectedRange.endDate) setDisplayEnd(selectedRange.endDate);
       setCalendarVisible(false);
    };










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


     <TouchableOpacity className="flex-row border border-gray-300 rounded-xl px-4 py-3 justify-between mb-4">
      <View className="flex-1 mr-2"> 
        <Text className="text-sm font-semibold text-gray-700 mb-1">Dates (optional)</Text>
        <View className="flex-row items-center">
           <Ionicons name="calendar" color={"#000"} size={17} className="mr-1"/>
           <Text className="text-sm text-gray-500">
             {displayStart ? dayjs(displayStart).format("MMM D") : "Start Date"}
           </Text> 
          </View>  
       </View>  

       <View>
         <Text className="text-sm font-semibold text-gray-700 mb-1 invisible">*</Text>
           <View>
             <Ionicons name="calendar" color="#666" className="mr-1" size={17}/>
             <Text className="text-sm text-gray-500">{displayEnd ? dayjs(displayEnd).format("MMM D") : "End Date"}</Text>
           </View>
       </View>
     </TouchableOpacity>

     <View className="flex-row justify-between items-center mb-8">
       <TouchableOpacity>
         <Text className="text-sm text-gray-600 font-medium">*Invite a tripmate</Text>
       </TouchableOpacity>
       <TouchableOpacity className="flex-row items-center">
        <Ionicons name="people" size={16} color="#666"/>
         <Text className="ml-1 text-sm text-gray-600 font-medium">Friends</Text>
        <Ionicons name="chevron-down" size={16} color="#666"/>
       </TouchableOpacity>
     </View>


     {error && (
       <Text className='text-red-500 text-sm mb-4'>{error}</Text>
     )} 

     <Text className='text-sm text-gray-500 text-center'>
       Or see an example for <Text className="font-semibold text-gray-600">NewYork</Text>
     </Text>

     <Modal>
       <View>
         <View>
            <Calendar 
             markingType='period'
              markedDates={getMarkedDates()}
               onDayPress={handleDayPress}
               minDate={today}
               theme = {{
                 todayTextColor : "#FF5722",
                 arrowColor : "#008FFF",
                 selectedDayTextColor : "#fff"
               }}/>
         </View>
       </View>
     </Modal>
    </SafeAreaView>
  )
};


export default NewTripScreen;
