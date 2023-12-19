import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";
import DisplayCoins from "../DisplayCoins.js";
import SimpleStore from "react-native-simple-store";

export default function GuessPlayerName() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);
  const stringsArray = [
    "MESSI",
    "BELLINGHAM",
    "ONANA",
    "HAKIMI",
    "MKHITARYAN",
    "SZOBOSZLAI",
    "PAQUETA",
    "CLAUSS",
    "NDIDI",
    "PALLOIS",
  ];

  const idArray = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];

  SimpleStore.get("GuessPlayerNameLevel")
    .then((value) => {
      setActualLevel(value - 1);
    })
    .catch((error) => {
      console.log("Error retrieving data: ", error);
    });

  useEffect(() => {
    setActualLevel(route.params?.level);
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
      <DisplayCoins></DisplayCoins>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Guess Player Name</Text>
      </View>
      <LevelsList
        idArray={idArray}
        stringsArray={stringsArray}
        actualLevel={actualLevel}
        redirection={"GuessPlayerNameLevel"}
      />
      <StatusBar style="auto" />
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
