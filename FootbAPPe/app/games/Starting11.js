import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";

export default function Starting11() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);
  const stringsArray = [
    "Karim Benzema",
    "Antoine Griezmann",
    "Hugo Lloris",
    "Angel Di Maria",
    "Thiago Alcantara",
    "Alvaro Morata",
    "Xavi Simons",
    "Raphaël Leao",
    "Ludovic Blas",
    "Alex Grimaldo",
  ];

  useEffect(() => {
    setActualLevel(route.params?.level);
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Starting 11</Text>
      </View>
      <LevelsList stringsArray={stringsArray}
      actualLevel={actualLevel}
      redirection={"Starting11Level"}/>
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
