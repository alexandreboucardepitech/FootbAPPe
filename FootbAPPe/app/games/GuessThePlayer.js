import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList";
import { useRoute } from "@react-navigation/native";
import SimpleStore from "react-native-simple-store";
import DisplayCoins from "../DisplayCoins";

export default function GuessThePlayer() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);

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

  SimpleStore.get("level")
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
        <Text style={styles.title}>Guess The Player</Text>
      </View>
      <LevelsList
        stringsArray={stringsArray}
        idArray={idArray}
        actualLevel={actualLevel}
        redirection={"GuessThePlayerLevel"}
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
