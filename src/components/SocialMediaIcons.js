import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, TouchableOpacity, Linking, StyleSheet } from "react-native";
const openFacebookLink = () => {
  Linking.openURL(
    "https://www.facebook.com/people/bengalgpt/100090844449518/?mibextid=ZbWKwL"
  );
};

const openLinkedInLink = () => {
  Linking.openURL("https://www.linkedin.com/company/bengalgpt/");
};

const openEmailLink = () => {
  Linking.openURL("mailto:bengalgpt@outlook.com");
};

const SocialMediaIcons = () => {
  return (
    <View style={style.socialButtonContainer}>
      <TouchableOpacity style={style.socialIcons} onPress={openFacebookLink}>
        <FontAwesomeIcon icon={faFacebook} size={24} color="#3B5998" />
      </TouchableOpacity>
      <TouchableOpacity style={style.socialIcons} onPress={openLinkedInLink}>
        <FontAwesomeIcon icon={faLinkedin} size={24} color="#0077B5" />
      </TouchableOpacity>
      <TouchableOpacity style={style.socialIcons} onPress={openEmailLink}>
        <FontAwesomeIcon icon={faEnvelope} size={24} color="#ddd" />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcons: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default SocialMediaIcons;
