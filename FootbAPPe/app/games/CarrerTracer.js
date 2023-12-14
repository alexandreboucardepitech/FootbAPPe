import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";

export default function CarrerTracer() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);

  const idArray = [
    20801, //Cristiano Ronaldo
    194765, //Antoine Griezmann
    167948, //Hugo Lloris
    183898, //Di Maria
    213345, //Kingsley Coman
    189509, //Thiago Alcantara
    201153, //Alvaro Morata
    241721, //Rafael Leao
    231102, //Ludovic Blas
    210035, //Alex Grimaldo
  ];
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
        <Text style={styles.title}>Carrer Tracer</Text>
      </View>
      <LevelsList
        idArray={idArray}
        stringsArray={stringsArray}
        actualLevel={actualLevel}
        redirection={"CarrerTracerLevel"}
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
