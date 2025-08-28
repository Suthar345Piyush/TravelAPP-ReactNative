import { RouteProp } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { GuideStackParamList } from '../navigation/GuideStack'


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
   const iternary = itineraries[place.name] || [];
   const extraAttributes = additionalAttributes[place.name] || {entryFee:"N/A" , travelTips:[]};
   
  return (
    <View>
      <Text>GuideDetailScreen</Text>
    </View>
  )
}

export default GuideDetailScreen

const styles = StyleSheet.create({})