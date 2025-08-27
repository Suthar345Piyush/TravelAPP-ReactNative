import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from './HomeStack';
import {Ionicons} from "@expo/vector-icons";
import GuideStack from './GuideStack';
import ProfileScreen from '../screens/ProfileScreen';




const TabNavigator = () => {
   const Tab = createBottomTabNavigator();

  return (
     <Tab.Navigator screenOptions={{
        tabBarActiveTintColor : "#FF5722",
        tabBarInactiveTintColor : "#666",
        tabBarStyle:{backgroundColor : "#fff" , borderTopWidth:0},
        tabBarIconStyle : {
           marginBottom : -3
        },
        tabBarLabelStyle : {fontSize : 12},
        headerShown : false,
     }}>
       <Tab.Screen name="Home" component={HomeStack} options={{
         tabBarIcon : ({color , size}) => (
           <Ionicons name="home" color={color} size={size}/>
         ) 
       }}/>
       <Tab.Screen name="Guides" component={GuideStack} options={{
         tabBarIcon : ({color , size}) => (
           <Ionicons name="book" color={color} size={size}/>
         )
       }}/>
       <Tab.Screen name="Profile" component={ProfileScreen} options={{
         tabBarIcon : ({color , size}) => (
           <Ionicons name="person" color={color} size={size}/>
         )
       }}/>
     </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})