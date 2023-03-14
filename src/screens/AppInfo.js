import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Logo from "../components/Logo";
import { appDetailsInfo } from "../constant";

export default function AppIntro() {
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.container}>
        <Text style={styles.description}>{appDetailsInfo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    minHeight: "100%",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 150,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    color: "#000",
  },
});
