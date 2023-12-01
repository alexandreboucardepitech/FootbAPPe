import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SearchPlayer from "./SearchPlayer.js";
import { ScrollView } from "react-native-gesture-handler";
import { NGROK_URL } from "@env";
import axios from "axios";

export default function GuessPlayerNameLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const [guesses, setGuesses] = useState([]);
  const [playerToGuess, setPlayerToGuess] = useState(null);

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const handlePress = (level) => {
    navigation.navigate("GuessThePlayer", { level: level - 1 });
  };

  const getPlayerToGuess = (playerId) => {
    console.log("request /", NGROK_URL);
    axios
      .get(`${NGROK_URL}/api/player/${playerId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPlayerToGuess(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getPlayerToGuess(route.params?.text);
  }, [route.params?.text]);

  const renderCircles = (guess) => {
    const circles = [];
    const playerToGuessValues = [
      playerToGuess.nationality_name,
      playerToGuess.league_name,
      playerToGuess.club_name,
      playerToGuess.player_positions,
      playerToGuess.age,
      playerToGuess.club_jersey_number,
    ];
    const playerValues = [
      guess.nationality_name,
      guess.league_name,
      guess.club_name,
      guess.player_positions,
      guess.age,
      guess.club_jersey_number,
    ];
    for (let i = 0; i < 4; i++) {
      const dynamicFontSize = Math.max(10, 20 - (playerValues[i].length * 2));
      circles.push(
        <View
          key={i}
          style={[
            styles.circle,
            playerToGuessValues[i] == playerValues[i]
              ? styles.activeCircle
              : styles.inactiveCircle,
          ]}
        >
          <Text style={[styles.circleText, { fontSize: dynamicFontSize }]}>
            {playerValues[i]}
          </Text>
        </View>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  circleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  activeCircle: {
    backgroundColor: "green",
  },
  inactiveCircle: {
    backgroundColor: "red",
  },
  textAndCircleContainer: {
    alignItems: "center",
  },
  textAboveCircle: {
    textAlign: "center",
    marginBottom: 5,
  },
});