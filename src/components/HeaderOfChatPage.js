import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAnglesLeft, faCoins } from "@fortawesome/free-solid-svg-icons";

const HeaderOfChatPage = () => {
  const navigation = useNavigation();
  const { user } = useContext(userContext);
  const handlePress = () => {
    navigation.navigate("HomePage");
  };

  return (
    <View style={user ? style.header : style.headerAuth}>
      <TouchableOpacity onPress={handlePress}>
        <FontAwesomeIcon icon={faAnglesLeft} size={20} color={"white"} />
      </TouchableOpacity>
      <Text style={user ? style.headerTitle : style.authHeaderTitle}>
        {user ? "কথোপকথন" : "লগইন করে নাও"}
      </Text>
      {user && (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "মনে রেখোঃ",
              `প্রতিদিন তুমি উপহারস্বরূপ ${
                user ? user.tokenLimit : "২০০০"
              } পয়েন্টস পাবে। এটা তুমি ২৪ ঘণ্টা ব্যবহার করতে পারবে। ২৪ ঘন্টা পর তোমার পয়েন্টস আবার ${
                user ? user.tokenLimit : "২০০০"
              } করে দেওয়া হবে।`
            );
          }}
          style={style.pointButton}
        >
          <FontAwesomeIcon icon={faCoins} size={20} color={"white"} />
          <Text style={style.pointText}>
            {user.tokenLimit - user.tokenUsed}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: "#131313",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  headerAuth: {
    backgroundColor: "#131312",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  authHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 90,
  },
  pointButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  pointText: {
    color: "white",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default HeaderOfChatPage;
