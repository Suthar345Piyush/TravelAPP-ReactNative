import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from './HomeScreen';
import { useAuth, useUser } from '@clerk/clerk-expo';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from 'axios';




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




  return (
    <View>
      <Text>PlanTripScreen</Text>
    </View>
  )
}

export default PlanTripScreen

const styles = StyleSheet.create({})