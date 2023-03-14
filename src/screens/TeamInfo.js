import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { teamMembers } from "../constant";

const TeamInfo = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.highlight}>
          <Text style={styles.highlightedText}>BengalGPT</Text>
        </View>
        <View style={styles.rowContainer}>
          {teamMembers.map((member, i) => {
            return (
              <View key={i} style={styles.member}>
                <Image style={styles.avatar} source={member.imageUrl} />
                <Text style={styles.name}>{member.name}</Text>
                {/* <Text style={styles.role}>{member.designation}</Text> */}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  member: {
    width: "50%",
    borderColor: "black",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 175,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  role: {
    color: "#555",
    fontSize: 16,
  },
  highlight: {
    backgroundColor: "#ffbf00",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  highlightedText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

export default TeamInfo;
