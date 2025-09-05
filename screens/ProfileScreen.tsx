import {Text , View , SafeAreaView , StyleSheet ,Pressable, ScrollView, Image, TouchableOpacity} from "react-native";
import React, {useCallback, useState} from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./HomeScreen";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import dayjs from "dayjs";
import {Ionicons} from "@expo/vector-icons";


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


   useFocusEffect(
     useCallback(() => {
        fetchTrips();     
     } , [fetchTrips])
   );

   if(!user){
     return (
       <View className="flex-1 justify-center items-center bg-white">
         <Text className="text-lg text-gray-600">Please sign-in</Text>
       </View>
     )
   };


    // profile image of the user 
    
    const profileImage = user.imageUrl && user.externalAccounts.some(acc => acc.provider as string === "oauth_google") ? user.imageUrl : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";    //clean blank avatar 

    const email = user.primaryEmailAddress?.emailAddress || "No email found";
    const name = user.fullName || "Anonymous user";
    const handle = `@${user.username || user.id.slice(0 , 8)}`;


  const handleSignout = async () => {
        try {
          await signOut();
        } catch (err) {
          console.error("Sign-out error: " , JSON.stringify(err , null , 2));
        }
    };



    return (
       <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1" contentContainerStyle={{paddingBottom : 100}}>
            <View className="relative bg-pink-100 items-center pb-6 rounded-b-3xl">
               <View className="bg-yellow-500 absolute top-4 left-4 rounded-full py-1 px-3">
                 <Text className="text-xs text-white font-semibold">
                  PRO
                 </Text>
               </View>

               {/* profile image  section  */}

               <View className="mt-8 relative">
                  <Image source={{uri : profileImage}} className="w-24 h-24 rounded-full"/>
                    <TouchableOpacity className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-gray-300">
                     <Ionicons name="pencil" size={12} color="#555"/>
                   </TouchableOpacity>
               </View>


               {/* name , account handle , email  */}
             <Text className="mt-3 text-lg font-semibold">{name}</Text>
             <Text className="text-gray-500">{handle}</Text>
             <Text className="text-gray-500 text-sm mt-1">{email}</Text>


             {/* followers , following  */}
            <View className="flex-row justify-center mt-4 space-x-12"> 
               <View className="items-center">
                <Text className="font-bold text-base">0</Text>
                 <Text className="text-xs text-gray-500 tracking-wide">FOLLOWERS</Text>
               </View>
               <View className="items-center">
                 <Text className="font-bold text-base">0</Text>
                 <Text className="text-xs text-gray-500 tracking-wide">FOLLOWING</Text>
               </View>
            </View>


            {/* button for sign out  */}
          
           <TouchableOpacity className="bg-orange-500 px-6 py-3 rounded-lg mt-4" onPress={handleSignout}>
             <Text className="text-white font-semibold text-base">Sign Out</Text>
           </TouchableOpacity>
        </View>

        {/* tabs  */}

        <View>
           <Text>Trips</Text>
           <Text>Guides</Text>
           <TouchableOpacity>
             
           </TouchableOpacity>
        </View>


        </ScrollView>

       </SafeAreaView>
    );
};


