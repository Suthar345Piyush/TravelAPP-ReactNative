import { Image, ScrollView,  Text, View } from 'react-native'
import React from 'react';

const places = [
  {
    name: "Tirupati",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/tirumala-venkateswara-temple-tirupati-andhra-pradesh-city-ff?qlt=82&ts=1742150827046",
  },
  {
    name: "Bengaluru",
    image:
      "https://d1di04ifehjy6m.cloudfront.net/media/filer_public/7a/23/7a230dbe-215f-4144-9810-60f94e51116c/adobestock_835040940_2.png",
  },
  {
    name: "Coimbatore",
    image: "https://www.holidify.com/images/bgImages/COIMBATORE.jpg",
  },
  {
    name: "Mysore",
    image: "https://taxibazaar.in/assets/images/blog/mysore.jpg",
  },
  {
    name: "Madikeri",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/78/2c/57/abbey-falls.jpg?w=500&h=500&s=1",
  },
  {
    name: "Ooty",
    image:
      "https://s3.india.com/wp-content/uploads/2024/07/Historical-Places-To-Visit-In-Ooty.jpg##image/jpg",
  },
];

const WeekendTrips = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {places.map((place , index) => (
             <View key={index}>
              <Image source={{uri : place.image}}
               className="w-40 h-52 rounded-2xl"
               resizeMode='cover'/>
               <View className="absolute bottom-0 left-0 right-0 h-14 rounded-b-2xl justify-center items-center">
               <Text className="text-white font-bold text-xl">{place.name}</Text>
               </View>
             </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default WeekendTrips;


