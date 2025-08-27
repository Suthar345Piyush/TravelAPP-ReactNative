import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';

const destinations = [
  {
    name: "New York",
    image:
      "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
  },
  {
    name: "London",
    image:
      "https://i.natgeofe.com/n/ff6bc870-1700-4a2f-87a2-2955abd83794/h_25.539224.jpg",
  },
  {
    name: "Tokyo",
    image:
      "https://www.holidaymonk.com/wp-content/uploads/2024/05/Tokyo-Tour-Package.webp",
  },
  {
    name: "Paris",
    image:
      "https://static.independent.co.uk/2025/04/25/13/42/iStock-1498516775.jpg",
  },
  {
    name: "Scotland",
    image:
      "https://static1.squarespace.com/static/5efb46cf46fb3d2f36091afa/t/64b7c94672ad2f232d2ec52a/1689766218839/Edinburgh+%283%29.jpg?format=1500w",
  },
];


const PopularDestinations = () => {
  return (
    <View className="mt-2">
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           {destinations.map((place , index) => (
             <View key={index} className="mr-4 relative">
              <Image source={{uri : place.image}}
               className="w-40 h-52 rounded-2xl" resizeMode='cover'/>

               <View className="absolute bottom-0 left-0 right-0 h-14 rounded-b-2xl justify-center items-center">
                 <Text className="text-white font-bold text-xl">{place.name}</Text>
               </View>
             </View>
           ))}
       </ScrollView>
    </View>
  );
};

export default PopularDestinations;

