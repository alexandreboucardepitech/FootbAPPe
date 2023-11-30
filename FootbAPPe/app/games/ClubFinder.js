import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";

export default function ClubFinder() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);
  const stringsArray = [
    "Messi",
    "Bellingham",
    "Onana",
    "Kvaratskhelia",
    "Mkhitaryan",
    "Szoboszlai",
    "Paqueta",
    "Clauss",
    "Ndidi",
    "Pallois",
  ];

  const idArray = [
    165153, //Karim Benzema
    194765, //Antoine Griezmann
    167948, //Hugo Lloris
    183898, //Di Maria
    189509, //Thiago Alcantara
    201153, //Alvaro Morata
    245367, //Xavi Simons
    241721, //Rafael Leao
    231102, //Ludovic Blas
    210035, //Alex Grimaldo
  ];

  useEffect(() => {
    setActualLevel(route.params?.level);
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Club Finder</Text>
      </View>
      <LevelsList
        idArray={idArray}
        stringsArray={stringsArray}
        actualLevel={actualLevel}
        redirection={"ClubFinderLevel"}
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
  },
});
