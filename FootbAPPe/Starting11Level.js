import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Starting11Level() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const handlePress = (level) => {
    console.log("FINISH");
    navigation.navigate("Starting11", { level: level - 1 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Starting 11 : Niveau ${index}`}</Text>
        <Text>{`Player : ${player}`}</Text>
      </View>
      <TouchableOpacity
        key={index}
        style={styles.touchableOpacity}
        onPress={() => handlePress(index)}
      >
        <Text>FINISH</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    color: "white",
  },
  touchableOpacity: {
    backgroundColor: "#B3EFB2",
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 100,
  },
});
