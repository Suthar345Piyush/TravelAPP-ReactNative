import { SafeAreaView, StyleSheet, Text, View , Image, TouchableOpacity  } from 'react-native'
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'react-router-dom';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import FeaturedGuides from '../components/FeaturedGuides';
import PopularDestinations from '../components/PopularDestinations';


// parameter list of the home stack 
export type HomeStackParamList = {
   HomeMain : undefined;
   NewTrip : undefined;
   PlanTrip : {trip:any};
   AIChat: undefined;
   MapScreen : undefined; 
};

// tab navigator params list 
export type TabNavigatorParamList = {
    Home : undefined;
    Guides : undefined;
    Profile : undefined;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList & TabNavigatorParamList>;


const HomeScreen = () => {
  const navigation = useNavigation();




  return (
     <SafeAreaView className='flex-1 bg-white'>
       <ScrollView className="flex-1">
         <View className="flex-row justify-between items-center px-4 pt-4 pb-2">
          <Image 
           source={{uri : "https://wanderlog.com/assets/logoWithText.png"}}
            className="w-36 h-8"
             resizeMode="contain"/>
             <View className="flex-row items-center space-x-3">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
             <Text className="text-lg">🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-400 px-3 py-1 rounded-full">
           <Text className="text-sm font-semibold text-white">
               PRO
           </Text>
            </TouchableOpacity>
             </View>
         </View>

         <View className="border-b border-gray-200 mx-4"/>

         <View className="relative">
           <Image source={{uri : "https://images.unsplash.com/photo-1501785888041-af3ef285b470"}}
            className="w-full h-80"
             resizeMode='cover'/>
             <View className="absolute inset-0 flex items-center justify-center">
              <Text className="text-white text-4xl font-bold text-center px-6">Plan your next adventure</Text>
               <TouchableOpacity className="bg-orange-500 px-6 py-2 rounded-full mt-4">
                  <Text className="text-white font-semibold text-base">Create new trip plan</Text>
             </TouchableOpacity>
         </View>
         </View>


         <View className="p-4">
            <Text className="text-2xl font-semibold mb-4">
                Featured Guides from users
            </Text>
            <FeaturedGuides/>
         </View>

         <View className="p-4">
            <Text className="text-2xl font-semibold mb-4">
                Explore Popular destinations
            </Text>
            <PopularDestinations/>
         </View>
       </ScrollView>
     </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})