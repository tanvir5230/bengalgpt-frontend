import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert } from "react-native";

import HomePage from "./src/screens/HomePage";
import ChatPage from "./src/screens/ChatPage";
import TeamInfo from "./src/screens/TeamInfo";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppInfo from "./src/screens/AppInfo";

const Stack = createNativeStackNavigator();
export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      Alert.alert("couldn't logged out.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem("user");
        if (userJSON !== null) {
          const userObject = JSON.parse(userJSON);
          setUser(userObject);
        }
      } catch (e) {
        console.log("Error fetching user data: ", e);
      }
    };

    fetchUser();
  }, []); // Call this effect only once when the component mounts

  return (
    <userContext.Provider value={{ user, setUser, signOut }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false, statusBarColor: "#622ad6" }}
          />
          <Stack.Screen
            name="ChatPage"
            component={ChatPage}
            options={{
              headerShown: false,
              statusBarColor: "#131313",
            }}
          />
          <Stack.Screen
            name="TeamInfo"
            component={TeamInfo}
            options={{
              headerTitle: "Founding Members of",
              headerTitleAlign: "center",
              statusBarColor: "#131313",
            }}
          />
          <Stack.Screen
            name="AppInfo"
            component={AppInfo}
            options={{
              headerTitle: "BengalGPT",
              headerTitleAlign: "center",
              headerTitleStyle: {
                backgroundColor: "#ffbf00",
                color: "orange",
                borderRadius: 10,
              },
              statusBarColor: "#131313",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
};

export default App;
