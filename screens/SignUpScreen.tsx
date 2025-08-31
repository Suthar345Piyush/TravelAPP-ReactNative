import {useSignUp} from "@clerk/clerk-expo";
import {View , Text , TextInput , TouchableOpacity , StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import React , {useState} from "react";


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function SignUpScreen() {
   const {isLoaded , signUp , setActive} = useSignUp();
   const navigation = useNavigation<NavigationProp>();
   const [emailAddress , setEmailAddress] = useState("");
   const [password , setPassword] = useState("");
   const [pendingVerification , setPendingVerification] = useState("");
   const [code , setCode] = useState("");
   const [error , setError]  = useState("");

   const onSignUpPress = async () => {
      if(!isLoaded) return;

      try {
         await signUp.create({
           emailAddress,
           password,
         });

         await signUp.prepareEmailAddressVerification({strategy : "email_code"});
         setPendingVerification(true);
      } catch (err : any){
         console.error("Sign-Up error: " , JSON.stringify(err , null , 2));
         setError(err.errors[0]?.message || "Sign-up failed");
      }
   };

   const onVerifyPress = async () => {
      if(!isLoaded) return;

      try {
        const singUpAttempt = await signUp.attemptEmailAddressVerification({
           code,
        });

        if(singUpAttempt.status === "complete") {
           await setActive({session : singUpAttempt.createdSessionId});
        } else {
          console.error("Verification incomplete: " , JSON.stringify(singUpAttempt , null , 2));
          setError("Verification incomplete.Please try again");
        }
      } catch(err : any){
         console.error("Verification error: " , JSON.stringify(err , null , 2));
         setError(err.errors[0]?.message || "Verification failed");
      }
   };



   if(pendingVerification){
      return (
         <View style={styles.container}>
           <Text style={styles.title}>Verify your email</Text>
            <TextInput style={styles.input}
             value={code}
              placeholder="Enter your verification code"
              onChangeText={setCode}/> 
            
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
               <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
         </View>
      )
   };


   return (
     <View style={styles.container}>
       <Text style={styles.title}>Sign-Up</Text>
        <TextInput style={styles.input} autoCapitalize="none"
        value={emailAddress} placeholder="Enter your email.."
         onChangeText={setEmailAddress} keyboardType="email-address"/>
         <TextInput style={styles.input} value={password} placeholder="Enter your password.."
         secureTextEntry onChangeText={setPassword}/>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={[styles.linkText , {color : "#FF5722"}]}>Sign-In</Text>
          </TouchableOpacity>
        </View>
     </View>
   );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#FF5722",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});