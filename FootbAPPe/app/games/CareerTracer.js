import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";
import SimpleStore from "react-native-simple-store";
import DisplayCoins from "../DisplayCoins";

export default function CareerTracer() {
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
    "Cristiano Ronaldo",
    "Antoine Griezmann",
    "Hugo Lloris",
    "Di Maria",
    "Kingsley Coman",
    "Thiago Alcantara",
    "Alvaro Morata",
    "Rafael Leao",
    "Ludovic Blas",
    "Alex Grimaldo",
  ];

  SimpleStore.get("CareerTracerLevel")
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
        <Text style={styles.title}>Career Tracer</Text>
      </View>
      <LevelsList
        idArray={idArray}
        stringsArray={stringsArray}
        actualLevel={actualLevel}
        redirection={"CareerTracerLevel"}
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
