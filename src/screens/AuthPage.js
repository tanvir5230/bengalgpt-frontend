import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { userContext } from "../../App";
import { apiEndpoints, serverName } from "../constant";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

//testing
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const AuthPage = () => {
  const { user, setUser } = useContext(userContext);
  const [redirect, setRedirect] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const navigation = useNavigation();

  GoogleSignin.configure({
    scopes: ["email", "profile"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "755385032599-48kqlnb8pqbi38kbkkvmk3qa14sionrd.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setIdToken(userInfo.idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrorMsg("Your sign in process was cancelled.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setErrorMsg("Your sing in process is in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorMsg("play services not available or outdated");
      } else {
        setErrorMsg("some other error happened");
      }
    }
  };

  async function fetchUserInfo() {
    let response = await axios.post(
      `${serverName}/${apiEndpoints.authEndpoint}`,
      {
        tokenId: idToken,
      }
    );
    const userInfo = await response.data;
    setUser(userInfo);
    setRedirect(false);
    AsyncStorage.setItem("user", JSON.stringify(userInfo)).then(() => {
      console.log("User data saved to local storage.");
    });
  }

  useEffect(() => {
    user && navigation.navigate("ChatPage");
  }, [user, navigation]);

  useEffect(() => {
    if (idToken !== null) {
      setRedirect(true);
      fetchUserInfo();
    }
  }, [idToken]);

  return (
    <>
      <View style={styles.container}>
        {!redirect && (
          <TouchableOpacity disabled={user ? true : false} onPress={signIn}>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonContainer}>
                <FontAwesomeIcon icon={faGoogle} size={20} color={"white"} />
                <Text style={styles.buttonText}>Sign in with Google</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {redirect && (
          <View>
            <ActivityIndicator size={"large"} color={"blue"} />
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Redirecting to chatpage...
            </Text>
          </View>
        )}
        {errorMsg.length > 0 && <Text>{errorMsg}</Text>}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    minHeight: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#4285F4",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AuthPage;
