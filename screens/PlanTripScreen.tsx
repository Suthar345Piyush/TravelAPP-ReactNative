import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from './HomeScreen';
import { useAuth, useUser } from '@clerk/clerk-expo';





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






 

  return (
    <View>
      <Text>PlanTripScreen</Text>
    </View>
  )
}

export default PlanTripScreen

const styles = StyleSheet.create({})