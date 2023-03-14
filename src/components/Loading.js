import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>
        দয়া করে কিছুক্ষণ অপেক্ষা কর। তোমার অনুরোধটি প্রসেসিং এ আছে।
      </Text>
      <Image
        source={require("../../assets/images/logo.gif")}
        style={styles.loadingImageStyle}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingImageStyle: {
    marginTop: 15,
    width: 50,
    height: 50,
  },
});
