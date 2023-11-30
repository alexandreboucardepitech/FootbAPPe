import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SearchPlayer from "./SearchPlayer.js";

export default function ClubFinderLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const [guess, setGuess] = useState(-1)

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const handlePress = (level) => {
    navigation.navigate("GuessThePlayer", { level: level - 1 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Guess the player : Niveau ${index}`}</Text>
        <Text>{`Player : ${player}`}</Text>
        <Text>{`Guess : ${guess}`}</Text>
      </View>
      <SearchPlayer setGuess={setGuess} />
      {player == guess && (
        <TouchableOpacity
          key={index}
          style={styles.touchableOpacity}
          onPress={() => handlePress(index)}
        >
          <Text>FINISH</Text>
        </TouchableOpacity>
        )}
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
    fontSize: 20,
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
