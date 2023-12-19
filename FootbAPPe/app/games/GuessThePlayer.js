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
    231747, //Kylian Mbappe
    192985, //Kevin De Bruyne
    167495, //Manuel Neuer
    232656, //Théo Hernandez
    188350, //Marco Reus
    186942, //Ilkay Gundogan
    230666, //Gabriel Jesus
    235805, //Federico Chiesa
    243630, //Jonathan David
    248243, //Eduardo Camavinga
    242516, //Cody Gakpo
    243580, //Loïs Openda
    225663, //Aleksandr Golovin
    178005, //Rui Patricio
    235410, //Youssef En-Neysri
    247679, //Victor Boniface
    259608, //Evan Ferguson
    245741, //Jesper Lindstrom
    237221, //Juan Foyth
    224019, //Pedro Chirivella
  ];
  const stringsArray = [
    "Kylian Mbappe",
    "Kevin De Bruyne",
    "Manuel Neuer",
    "Théo Hernandez",
    "Marco Reus",
    "Ilkay Gundogan",
    "Gabriel Jesus",
    "Federico Chiesa",
    "Jonathan David",
    "Eduardo Camavinga",
    "Cody Gakpo",
    "Loïs Openda",
    "Takumi Minamino",
    "Rui Patricio",
    "Youssef En-Neysri",
    "Victor Boniface",
    "Evan Ferguson",
    "Jesper Lindstrom",
    "Juan Foyth",
    "Pedro Chirivella",
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
