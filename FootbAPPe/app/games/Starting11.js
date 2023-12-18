import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";

export default function Starting11() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);
  const idArray = [
    [
      [null, 239085, null],
      [206517, null, 237692],
      [null, 192985, null],
      [null, null],
      [231866, null, 218667],
      [null, null, null],
      [null, null],
      [251517, 239818, null, 208920, 188377],
      [210257],
    ],
    [
      [null, 239085, null],
      [206517, null, 237692],
      [null, 192985, null],
      [null, null],
      [231866, null, 218667],
      [null, null, null],
      [null, null],
      [251517, 239818, null, 208920, 188377],
      [210257],
    ],
  ];
  const stringsArray = [
      "Manchester City",
      "FC Barcelone",
      "Olympique de Marseille",
      "Borussia Dortmund",
      "Aston Villa",
      "Bayer Leverkusen",
      "AS Roma",
      "Séville FC",
      "PSV Eindhoven",
      "FC Nantes",
  ];

  useEffect(() => {
    setActualLevel(route.params?.level);
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Starting 11</Text>
      </View>
      <LevelsList
        idArray={idArray}
        stringsArray={stringsArray}
        actualLevel={actualLevel}
        redirection={"Starting11Level"}
      />
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
});
