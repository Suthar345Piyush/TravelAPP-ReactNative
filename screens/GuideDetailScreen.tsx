import { RouteProp } from '@react-navigation/native'
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GuideStackParamList } from '../navigation/GuideStack'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from "@expo/vector-icons";


type GuideDetailScreenRouteProp = RouteProp<GuideStackParamList , 'GuideDetail'>;

type Props = {
   route : GuideDetailScreenRouteProp;
   navigation : any;
};

// iternary hardcoded data , can be fetch from backend

const itineraries: { [key: string]: string[] } = {
  "Mysore Palace": [
    "Day 1: Explore Durbar Hall and Royal Artifacts.",
    "Day 2: Attend the Dussehra Festival (October) or evening light show.",
    "Day 3: Visit nearby Chamundi Hills and Jaganmohan Palace.",
  ],
  "Coorg (Kodagu)": [
    "Day 1: Visit Abbey Falls and hike through coffee plantations.",
    "Day 2: Relax at Raja’s Seat and explore Talacauvery.",
    "Day 3: Trek to Tadiandamol Peak or go river rafting.",
  ],
  Hampi: [
    "Day 1: Tour Virupaksha Temple and Hampi Bazaar.",
    "Day 2: Explore Vijaya Vittala Temple and boulder landscapes.",
    "Day 3: Try rock climbing or visit nearby Anjaneya Hill.",
  ],
  Gokarna: [
    "Day 1: Visit Mahabaleshwar Temple and Om Beach.",
    "Day 2: Relax at Kudle Beach or try surfing.",
    "Day 3: Explore Half Moon Beach and Paradise Beach.",
  ],
};

// some more attributes 

const additionalAttributes: {
  [key: string]: { entryFee: string, travelTips: string[] },
} = {
  "Mysore Palace": {
    entryFee: "₹70 for adults, ₹30 for children",
    travelTips: [
      "Book tickets online to avoid queues.",
      "Visit during Dussehra for the grand festival.",
      "Photography inside requires a separate fee.",
    ],
  },
  "Coorg (Kodagu)": {
    entryFee: "Free for most attractions, some estates may charge ₹100-₹200",
    travelTips: [
      "Carry rain gear during monsoon (June-September).",
      "Book homestays in advance for peak season.",
      "Try local Kodava cuisine like Pandi Curry.",
    ],
  },
  Hampi: {
    entryFee: "₹40 for main monuments, free for open ruins",
    travelTips: [
      "Hire a local guide for historical insights.",
      "Wear comfortable shoes for exploring ruins.",
      "Visit in winter for cooler weather.",
    ],
  },
  Gokarna: {
    entryFee: "Free for beaches, temple entry free",
    travelTips: [
      "Respect temple dress codes (cover shoulders and knees).",
      "Book beach shacks early during peak season.",
      "Carry sunscreen for beach activities.",
    ],
  },
};


const GuideDetailScreen = ({route , navigation}:Props) => {
   const {place} = route?.params;
   const itinerary = itineraries[place.name] || [];
   const extraAttributes = additionalAttributes[place.name] || {entryFee:"N/A" , travelTips:[]};
   
  return (
    <SafeAreaView className="flex-1 bg-white">
       <ScrollView className="flex-1" contentContainerStyle={{paddingBottom : 100}}>
          {/* image header  */}
          <ImageBackground source={{uri : place.image}}
           resizeMode='cover'
            className="w-full h-80">

              <View  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>

               {/* back button  */}
               <TouchableOpacity className="" onPress={() => navigation.goBack()}>

                 <Ionicons name="arrow-back" size={23} color="#FF5722"/>
               </TouchableOpacity>

               {/* place info  */}

               <View className="p-4 flex-1 justify-end">
                 <Text className="text-white text-2xl font-bold">
                  {place.name}
                 </Text>
               </View>
          </ImageBackground>
    
    {/* detail section  */}
    <View className="p-4">
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">About</Text>
          <Text className="text-base font-medium text-gray-800">
            {place.description}
          </Text>
        </View>

        {/* attributes  */}

        <View className="border-t border-gray-200 pt-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Details</Text>

       <View className="flex-row items-center mb-3">
             <Ionicons name="location-outline" size={23} color="#FF5722"/> 
            <Text className="">Location: {place.attributes.location}</Text>
       </View>

       <View className="flex-row items-center mb-3">
         <Ionicons name="map-outline" size={21} color="#FF5722"/>
         <Text className="text-gray-800 text-base font-medium ml-3">Type: {place.attributes.type}</Text>
       </View>

       <View className="flex-row items-center mb-3">
         <Ionicons name="calendar-outline" size={21} color="#FF5722"/>
         <Text className="">Best Time: {place.attributes.bestTime}</Text>
       </View>

       <View className="flex-row items-center mb-3">
          <Ionicons name="star-outline" size={21} color="#FF5722"/>
          <Text className="">Attractions: {place.attributes.attractions.join(', ')}</Text>
       </View>
       
       <View className="flex-row items-center mb-3">
       <Ionicons name="cash-outline" size={21} color="#FF5722"/>
       <Text className="">Entry Fee: {extraAttributes.entryFee}</Text>
       </View>
    </View>

    {/* itinerary  */}

    {itinerary.length > 0 && (
       <View className="border-t border-gray-200 pt-4 mb-6">
        <Text className="flex-row items-center mb-3">Suggested Itinerary</Text> 
          {itinerary.map((item , index) => (
          <View key={index}  className="flex-row items-start mb-2">
       <Text className="text-gray-800 text-base font-medium mr-2">*</Text>
       <Text className="text-gray-800 text-base font-medium flex-1">{item}</Text>
          </View>
        ))}
       </View>
    )}

       {/* travel tips  */}
    
    {extraAttributes.travelTips.length > 0 && (
       <View className="border-t border-gray-200 pt-4">
         <Text className="text-lg font-semibold text-gray-800 mb-3">Travel Tips</Text>
         {extraAttributes.travelTips.map((tip , index) => (
           <View className="flex-row items-start mb-2" key={index}>
            <Text className="text-gray-800 text-base font-medium mr-2">*</Text>
            <Text className="text-gray-800 text-base font-medium flex-1">{tip}</Text>
           </View>
         ))}
       </View>
    )}
  </View>
       </ScrollView>
    </SafeAreaView>
  );
}

export default GuideDetailScreen;

