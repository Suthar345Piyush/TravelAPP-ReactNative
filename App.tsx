import {NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import "./global.css";
// import TabNavigator from './navigation/TabNavigator';
import RootNavigator from "./navigation/RootNavigator";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { TripProvider } from "./context/TripContext";


const tokenCache = {
   async  getToken(key : string) {
     try {
       return await SecureStore.getItemAsync(key);
     } catch(err){
       return null;
     }
   },
   async saveToken(key:string , value : string){
      try {
         return await SecureStore.setItemAsync(key , value)
      } catch(err){
         return;
      }
   }
};


export default function App() {
  return (
     <ClerkProvider publishableKey="pk_test_Y2hhcm1lZC1jb2x0LTk2LmNsZXJrLmFjY291bnRzLmRldiQ" tokenCache={tokenCache}>
      <TripProvider>
            <NavigationContainer>
            <RootNavigator />
            </NavigationContainer>
             </TripProvider>
     </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
