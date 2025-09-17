import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuideScreen from '../screens/GuideScreen';
import GuideDetailScreen from '../screens/GuideDetailScreen';

// predefining the types for type safety 
export type Place = {
    id : string;
    name : string;
    image : string;
    description : string;
    attributes : {
        location : string;
        type : string;
        bestTime : string;
        attractions : string[];
    };
};

// defining navigation params list 

export type GuideStackParamList = {
    GuideMain : undefined;
    GuideDetail : {place : Place};
};


 const Stack = createNativeStackNavigator<GuideStackParamList>();


const GuideStack = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="GuideMain" component={GuideScreen}/>
       <Stack.Screen name="GuideDetail" component={GuideDetailScreen}/>
    </Stack.Navigator>
  )
};


export default GuideStack;
