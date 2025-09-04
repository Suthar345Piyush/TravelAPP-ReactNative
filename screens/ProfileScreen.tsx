import {Text , View , SafeAreaView , StyleSheet ,Pressable} from "react-native";
import React, {useCallback, useState} from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./HomeScreen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import dayjs from "dayjs";



export type TabNavigatorParamList = {
   Home : { screen?: string;
            params?: any};  // for nested navigation 

            Guides : undefined;
            Profile : undefined;
};

// combined navigation prop type 

type ProfileScreenNavigationProp = NativeStackNavigationProp<TabNavigatorParamList & HomeStackParamList>;


const ProfileScreen = () => {
    const {signOut} = useClerk();
    const {user} = useUser();

    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [trips , setTrips] = useState<any[]>([]);
    const [rawTrips , setRawTrips] = useState<any[]>([]);     // real trips comes from backend 
    const [error , setError] = useState<string | null>(null);

   const fetchTrips = useCallback(async () => {
        try{
           const clerkUserId = user?.id;
           if(!clerkUserId) {
             setError("User is not authenticated");
             return;
           }

           const response = await axios.get("http://localhost:3000/api/trips" , {
             params : {clerkUserId},
           });

           const formattedTrips = response.data.trips.map((trip : any) => ({
              id : trip._id,
              name : trip.tripName,
              date : `${dayjs(trip.startDate).format("D MMM")} - ${dayjs(trip.endDate).format("D MMM YYYY")}`,
              image : trip.background || "https://via.placeholder.com/150",
              places : trip.placesToVisit?.length || 0,
              daysLeft : dayjs(trip.startDate).isAfter(dayjs()) ? dayjs(trip.startDate).diff(dayjs() , "day") : null,
           }));

           setTrips(formattedTrips);
           setRawTrips(response.data.trips);     // storing original trips 
           setError(null);
        } catch(error){
           
        }
   } , [user]); 








  const handleSignout = async () => {
        try {
          await signOut();
        } catch (err) {
          console.log("Error" , err);
        }
    }

    return (
       <SafeAreaView>
         <Text>ProfileScreen</Text>
         <Pressable onPress={handleSignout}>
           <Text>Logout</Text>
         </Pressable>
       </SafeAreaView>
    );
};


