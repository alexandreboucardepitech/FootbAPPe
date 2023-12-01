import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SearchPlayer from "./SearchPlayer.js";
import { ScrollView } from "react-native-gesture-handler";
import { NGROK_URL } from "@env";
import axios from "axios";

export default function GuessPlayerNameLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const [guesses, setGuesses] = useState([]);
  const [teamGuesses, setTeamGuesses] = useState([]);
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

  const addTeamLogo = (player) => {
    axios
      .get(`${NGROK_URL}/api/team/${player.club_team_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTeamGuesses([...teamGuesses, response.data.logo_url]);
        console.log(
          "la",
          response.data,
          response.data.logo_url,
          `https://cdn.sofifa.net${response.data.logo_url}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getPlayerToGuess(route.params?.text);
  }, [route.params?.text]);

  useEffect(() => {}, [playerToGuess]);

  const getCircleColor = (playerPos, guessPos) => {
    if (playerPos == guessPos) {
      return styles.greenCircle;
    }
    const playerAllPos = playerPos.split(", ");
    const guessAllPos = guessPos.split(", ");
    for (let i = 0; i < playerAllPos.length; i++) {
      for (let j = 0; j < guessAllPos.length; j++) {
        if (playerAllPos[i] == guessAllPos[j]) return styles.orangeCircle;
      }
    }
    return styles.redCircle;
  };

  const renderCircles = (guess, playerIndex) => {
    const circles = [];
    const playerToGuessValues = [
      playerToGuess.nationality_name,
      playerToGuess.league_name,
      playerToGuess.club_name,
      playerToGuess.player_positions,
      playerToGuess.age,
    ];
    const playerValues = [
      guess.nationality_name,
      guess.league_name,
      guess.club_name,
      guess.player_positions,
      guess.age.toString(),
    ];
    for (let i = 0; i < playerToGuessValues.length; i++) {
      dynamicFontSize = Math.max(10, 20 - playerValues[i].length * 2);
      if (i == 3) {
        circles.push(
          <View
            key={i}
            style={[
              styles.circle,
              getCircleColor(playerToGuessValues[i], playerValues[i]),
            ]}
          >
            <Text style={[styles.circleText, { fontSize: dynamicFontSize }]}>
              {playerValues[i]}
            </Text>
          </View>
        );
      } else {
        circles.push(
          <View
            key={i}
            style={[
              styles.circle,
              playerToGuessValues[i] == playerValues[i]
                ? styles.greenCircle
                : styles.redCircle,
            ]}
          >
            {i !== 2 || teamGuesses[playerIndex] == "" ? (
              <Text style={[styles.circleText, { fontSize: dynamicFontSize }]}>
                {playerValues[i]}
              </Text>
            ) : (
              <Image
                source={{
                  uri: `https://cdn.sofifa.net${teamGuesses[playerIndex]}`,
                }}
                style={{ width: 40, height: 40 }}
              />
            )}
          </View>
        );
      }
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
        >{`https://cdn.sofifa.net${teamGuesses[0]}`}</Text>
        <Text>{`Player : ${player}`}</Text>
      </View>
      <SearchPlayer
        setGuesses={setGuesses}
        guesses={guesses}
        addTeamLogo={addTeamLogo}
      />
      <ScrollView>
        {guesses.map((guess, index) => (
          <View key={index} style={styles.guess}>
            <View style={styles.textAndCircleContainer}>
              <Text style={styles.textAboveCircle}>{guess.short_name}</Text>
              <View style={styles.circleContainer}>
                {renderCircles(guess, index)}
              </View>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
  },
  circleText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  greenCircle: {
    backgroundColor: "green",
  },
  redCircle: {
    backgroundColor: "red",
  },
  orangeCircle: {
    backgroundColor: "orange",
  },
  textAndCircleContainer: {
    alignItems: "center",
  },
  textAboveCircle: {
    textAlign: "center",
    marginBottom: 5,
  },
});
