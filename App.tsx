import {NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import "./global.css";
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
     <NavigationContainer>
       <TabNavigator />
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
