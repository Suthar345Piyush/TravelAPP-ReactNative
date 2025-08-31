import {NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import "./global.css";
import TabNavigator from './navigation/TabNavigator';
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
     <NavigationContainer>
       <RootNavigator />
     </NavigationContainer>
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
