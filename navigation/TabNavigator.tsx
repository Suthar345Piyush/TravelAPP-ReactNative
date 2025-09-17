import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from './HomeStack';
import {Ionicons} from "@expo/vector-icons";
import GuideStack from './GuideStack';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import TripScreen from '../screens/TripScreen';
import GuideScreen from '../screens/GuideScreen';
import {View , Text} from "react-native";



const Tab = createBottomTabNavigator();


const TabNavigator = () => {
   

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
};

export default TabNavigator;

