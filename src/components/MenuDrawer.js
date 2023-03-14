import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userContext } from "../../App";
import { appShortInfoTextInMenu } from "../constant";
import SocialMediaIcons from "./SocialMediaIcons";

export default function MenuDrawer({ isOpen, onClose }) {
  const { user, signOut } = useContext(userContext);
  const navigation = useNavigation();
  if (!isOpen) {
    return null;
  }

  const handleLogOut = () => {
    signOut();
  };

  const handleLogin = () => {
    navigation.navigate("ChatPage");
  };

  const renderUserInfo = () => {
    if (user) {
      return (
        <>
          <View style={styles.userInfoContainer}>
            <View style={styles.userImageContainer}>
              <Image style={styles.userImage} source={{ uri: user.image }} />
            </View>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </>
      );
    } else {
      return <Text style={styles.notLoggedInText}>You are not logged in</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoContainer}>
          {renderUserInfo()}
          <Text style={styles.appShortInfoText}>{appShortInfoTextInMenu}</Text>
        </View>
        <SocialMediaIcons />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.teamInfoButton}
          onPress={() => navigation.navigate("AppInfo")}
        >
          <Text style={styles.buttonText}>App Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.teamInfoButton}
          onPress={() => navigation.navigate("TeamInfo")}
        >
          <Text style={styles.buttonText}>Team Info</Text>
        </TouchableOpacity>
        {!user && (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
        {user && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "75%",
    paddingHorizontal: 10,
    backgroundColor: "#131313",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
    borderTopRightRadius: 30,
  },
  userInfoContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  userImageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  appShortInfoText: {
    fontSize: 15,
    color: "#999",
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "#ddd",
    borderStyle: "dotted",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    minWidth: "100%",
  },
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  teamInfoButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#e9967a",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  notLoggedInText: {
    marginTop: 50,
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
