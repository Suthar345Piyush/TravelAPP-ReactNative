import {useSSO} from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import {View , Text , TouchableOpacity , Image , ActivityIndicator} from "react-native";

import React , {useCallback , useEffect , useState} from "react";

const useWarmUpBrowser = () => {
    useEffect(() => {
       void WebBrowser.warmUpAsync();
       return () => {
         void WebBrowser.coolDownAsync();
       }
    } , []);
};


export default function GoogleSignIn() {
   const {startSSOFlow} = useSSO({strategy : "oauth_google"});

}