import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';


const placess = [
  {
    id: "1",
    name: "Mysore Palace",
    image:
      "https://www.worldatlas.com/r/w1200/upload/e5/0e/5f/shutterstock-122322643.jpg",
    description:
      "The iconic Mysore Palace, a masterpiece of Indo-Saracenic architecture, is a must-visit for its grandeur and vibrant history. Illuminated at night, it hosts the famous Dussehra festival.",
    attributes: {
      location: "Mysore, Karnataka",
      type: "Heritage",
      bestTime: "October - April",
      attractions: ["Dussehra Festival", "Durbar Hall", "Royal Artifacts"],
    },
  },
  {
    id: "2",
    name: "Coorg (Kodagu)",
    image:
      "https://static.toiimg.com/thumb/104040262/coorg.jpg?width=1200&height=900",
    description:
      "Known as the Scotland of India, Coorg is a misty hill station famous for its coffee plantations, lush greenery, and serene waterfalls.",
    attributes: {
      location: "Kodagu, Karnataka",
      type: "Hill Station",
      bestTime: "October - March",
      attractions: [
        "Abbey Falls",
        "Raja’s Seat",
        "Coffee Plantations",
        "Trekking",
      ],
    },
  },
  {
    id: "3",
    name: "Hampi",
    image:
      "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/02/12133950/Hampi-places-to-visit-FI-1600x900.jpg",
    description:
      "A UNESCO World Heritage Site, Hampi is a historic village with ancient ruins of the Vijayanagara Empire, featuring stunning temples and boulders.",
    attributes: {
      location: "Ballari, Karnataka",
      type: "Heritage",
      bestTime: "October - February",
      attractions: [
        "Virupaksha Temple",
        "Vijaya Vittala Temple",
        "Rock Climbing",
      ],
    },
  },
  {
    id: "4",
    name: "Gokarna",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/om-beach-gokarna-karnataka-tri-hero?qlt=82&ts=1727164538227&wid=800",
    description:
      "A serene coastal town with pristine beaches and ancient temples, Gokarna is perfect for those seeking spirituality and relaxation.",
    attributes: {
      location: "Uttara Kannada, Karnataka",
      type: "Beach / Pilgrimage",
      bestTime: "October - March",
      attractions: ["Om Beach", "Mahabaleshwar Temple", "Surfing"],
    },
  },
];

const GuideScreen = () => {
  return (
     <SafeAreaView>
       <ScrollView>
         <View>
           <Text>
             Explore Karnataka
           </Text>
         </View>
       </ScrollView>
     </SafeAreaView>
  )
}

export default GuideScreen

