import { ActivityIndicator, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useAuth } from '@clerk/clerk-expo';


export type RootStackParamList = {
   Auth : undefined;
   SignIn : undefined;
   SignUp : undefined;
   Main : undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootNavigator(){
    const {isLoaded , isSignedIn}  = useAuth();

    // loading till the clerk authentication , working... 

    if(!isLoaded){
       return (
         <View style={{flex :1 , justifyContent : "center" , alignItems : "center"}}>
           <ActivityIndicator size="large" color="#FF5722"/>
         </View>
       );
    }

     return (
       <Stack.Navigator screenOptions={{headerShown : false}}>
         {isSignedIn ? (
            <Stack.Screen name="Main" component={TabNavigator}/>
         ) : (
           <Stack.Group>
             <Stack.Screen name="SignIn" component={SignInScreen}/>
             <Stack.Screen name="SignUp" component={SignUpScreen}/>
           </Stack.Group>
         )}
       </Stack.Navigator>  
     );
};



