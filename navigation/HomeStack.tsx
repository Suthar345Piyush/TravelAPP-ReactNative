import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewTripScreen from "../screens/NewTripScreen";
import PlanTripScreen from '../screens/PlanTripScreen';
import AiChatScreen from '../screens/AiChatScreen';
import MapScreen from '../screens/MapScreen';


//defining the home stack param list 
export type HomeStackParamList = {
   HomeMain : undefined;
   NewTrip : undefined;
   PlanTrip : {trip : any};
};


const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
       <Stack.Screen name="HomeMain" component={HomeScreen}/>
       <Stack.Screen name="NewTrip" component={NewTripScreen}/>
       <Stack.Screen name="PlanTrip" component={PlanTripScreen}/>
       <Stack.Screen name="AIChat" component={AiChatScreen}/>
       <Stack.Screen name="MapScreen" component={MapScreen}/>
    </Stack.Navigator>
  )
};

export default HomeStack;


