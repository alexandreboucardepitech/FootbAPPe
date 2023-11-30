import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SearchPlayer from "./SearchPlayer.js";
import { ScrollView } from "react-native-gesture-handler";

export default function ClubFinderLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const [guesses, setGuesses] = useState([]);

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const handlePress = (level) => {
    navigation.navigate("GuessThePlayer", { level: level - 1 });
  };

  const renderCircles = (guess) => {
    const circles = [];
    for (let i = 0; i < 5; i++) {
      circles.push(
        <View
          key={i}
          style={[
            styles.circle,
            player == guess.player_id
              ? styles.activeCircle
              : styles.inactiveCircle,
          ]}
        ></View>
      );
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Guess the player : Niveau ${index}`}</Text>
        <Text>{`Player : ${player}`}</Text>
      </View>
      <SearchPlayer setGuesses={setGuesses} guesses={guesses} />
      <ScrollView>
        {guesses.map((guess, index) => (
          <View key={index} style={styles.guess}>
            <View style={styles.textAndCircleContainer}>
              <Text style={styles.textAboveCircle}>{guess.short_name}</Text>
              <View style={styles.circleContainer}>{renderCircles(guess)}</View>
            </View>
          </View>
        ))}
      </ScrollView>
      {guesses.length != 0 &&
        player == guesses[guesses.length - 1].player_id && (
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
  guess: {
    backgroundColor: "#B3EFB2",
    padding: 10,
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circleContainer: {
    flexDirection: "row",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  activeCircle: {
    backgroundColor: "green",
  },
  inactiveCircle: {
    backgroundColor: "red",
  },textAndCircleContainer: {
    alignItems: 'center',
  },
  textAboveCircle: {
    textAlign: 'center',
    marginBottom: 5,
  },
});
