import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'


// defining the types of guide 
type Guide = {
  place: string;
  description: string;
  image: string;
  user: {
    name: string;
    avatar: string;
    views: number;
  };
};

const guides: Guide[] = [
  {
    place: 'Munnar, Kerala',
    description:
      'A peaceful retreat among tea gardens, waterfalls and cool misty hills.',
    image:
      'https://oneday.travel/wp-content/uploads/one-day-munnar-local-sightseeing-tour-package-with-top-station-by-private-car-header.jpg',
    user: {
      name: 'Ananya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      views: 421,
    },
  },
  {
    place: 'Hampi, Karnataka',
    description:
      'Explore the ruins of a glorious past. Adventure meets history here.',
    image:
      'https://assets-news.housing.com/news/wp-content/uploads/2022/08/31020547/places-to-visit-in-hampi-FEATURE-compressed.jpg',
    user: {
      name: 'Rahul Desai',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      views: 786,
    },
  },
  {
    place: 'Gokarna Beach',
    description:
      'Hidden coves, cozy cafes, and a chill beach town vibe.',
    image:
      'https://thesurfatlas.com/wp-content/uploads/2024/12/surfing-in-gokarna.jpg',
    user: {
      name: 'Neha Verma',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      views: 305,
    },
  },
];


const FeaturedGuides = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         {guides.map((guide , index) => (
           <View key={index} className="w-64 mr-4 rounded-2xl overflow-hidden bg-white shadow-lg">
          
          <Image source={{uri : guide.image}}
           className="w-full h-40"
           resizeMode="cover"/>
           <View className="py-3">
             <Text className="text-base font-bold text-gray-900">{guide.place}</Text>
             <Text className="text-xs text-gray-600 bg-gray-100 rounded-lg px-2 py-1 mt-2">{guide.description}</Text>

             <View>
               <Image source={{uri : guide.user.avatar}}
                className="w-8 h-8 rounded-full mr-2"/>
                <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-800">{guide.user.name}</Text>
                    <Text className="text-[11px] text-gray-500">{guide.user.views}</Text>
                </View>
             </View>
           </View>
           </View>

         ))}
         
      </ScrollView>
    </View>
  )
}

export default FeaturedGuides;

