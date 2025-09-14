  // Map screen 

import React , {useEffect , useRef , useState} from "react";
import {
   View,Text,FlatList,Dimensions,Image,NativeScrollEvent,NativeSyntheticEvent,TouchableOpacity,
} from "react-native";
import MapView , {Marker , Region} from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { FlatRecord } from "mongoose";


const {width} = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING = 12;



// defining all the types of the plan trip screen and plan to visit 


type Place = {
   id : string;
   name : string;
   briefDescription : string;
   photos : string[];
   formatted_address : string;
   geometry : {
     location : {
       lat : number;
       lng : number;
     }
   }
};

type MapRouteParams = {
   MapScreen : {
     places : Place[];
   };
};



const MapScreen = () => {
   const route = useRoute<RouteProp<MapRouteParams , "MapScreen">>();

   const places = route.params?.places || [];

   console.log("data" , route?.params);

   const [selectedIndex , setSelectedIndex] = useState(0);
   const mapRef = useRef<MapView>(null);
   const flatListRef = useRef<FlatList>(null);

   const moveToRegion = (place : Place) => {
      const region : Region = {
         latitude : place.geometry?.location.lat,
         longitude : place.geometry?.location.lng,
         latitudeDelta : 0.05,
         longitudeDelta : 0.05,
      };
      mapRef.current?.animateToRegion(region , 350);
   };

   const onMarkerPress = (index : number) => {
     setSelectedIndex(index);
     flatListRef.current?.scrollToIndex({index , animated : true});
     moveToRegion(places[index]);
   };

   const onCardScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
         e.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING)
      );

      if(index !== selectedIndex && places[index]){
         setSelectedIndex(index);
         moveToRegion(places[index]);
      }
   };



   useEffect(() => {
     if(places.length > 0 && mapRef.current) {
        const coordinates = places.map((place) => ({
          latitude : place.geometry.location.lat,
          longitude : place.geometry.location.lng,
        }));


        mapRef.current.fitToCoordinates(coordinates , {
           edgePadding : {top : 150 , right : 150 , bottom : 150 , left : 150},
           animated : true,
        });
     }
   } , [places]);


   return (
      <View className="flex-1">
        <MapView ref={mapRef} style={{flex:1 , height : "100%"}}
         initialRegion={{
           latitude : places[0]?.geometry?.location?.lat ?? 12.2958,
           longitude : places[0]?.geometry?.location?.lng ?? 76.6394,
           longitudeDelta : 1,
           latitudeDelta : 1,
         }}>


          {places.map((place , index) => (
             <Marker key={index} coordinate={{
                latitude : place.geometry?.location.lat,
                longitude : place.geometry?.location.lng,
             }} onPress={() => onMarkerPress(index)}>
                

                <View style={{
                   backgroundColor : index === selectedIndex ? "#007AFF" : "#FF3B30",
                   padding : index === selectedIndex ? 10 : 0,
                   borderRadius : 20,
                   borderWidth : 2,
                   borderColor : "#fff",
                }} />
             </Marker>
          ))}
        </MapView>

         {/* scrollable bottom card   */}
      
      <View className="absolute bottom-6">
        <FlatList 
          ref = {flatListRef}
          data={places}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          contentContainerStyle={{paddingHorizontal : SPACING}}
          onScroll={onCardScroll}
          renderItem={({item}) => {
             <View style={{width : CARD_WIDTH , marginRight : SPACING}} 
              className="bg-white rounded-2xl shadow-lg p-4"> 
                <Text className="text-base font-semibold text-black">
                 {item.name || "Unknown Place"}
                </Text>


                {item.briefDescription && (
                   <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
                      {item.briefDescription}
                   </Text>
                )}

              {item.photos?.[0] && (
                 <Image source={{uri : item.photos[0] || "https://via.placeholder.com/150"}}
                  className="h-24 w-full rounded-lg mt-2" resizeMode="cover"
                 />
              )}

              {item.formatted_address && (
                 <Text className="text-xs text-gray-400 mt-1">
                   {item.formatted_address}
                 </Text>
              )}
              </View>
           }}
          />
      </View>
    </View>
   );
};




export default MapScreen;

