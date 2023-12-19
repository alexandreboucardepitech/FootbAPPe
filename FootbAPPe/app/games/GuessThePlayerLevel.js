import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SearchPlayer from "./SearchPlayer.js";
import { ScrollView } from "react-native-gesture-handler";
import { NGROK_URL } from "@env";
import axios from "axios";
import SimpleStore from "react-native-simple-store";
import DisplayCoins from "../DisplayCoins.js";

export default function GuessPlayerNameLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const [guesses, setGuesses] = useState([]);
  const [playerToGuess, setPlayerToGuess] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  const [coins, setCoins] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const index = route.params?.index + 1;
  const player = route.params?.text;
  const actualLevel = route.params?.actualLevel;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const clear = () => {
    SimpleStore.delete(`guessesLevel${index}`);
    setGuesses([]);
  };

  const handlePress = (level) => {
    SimpleStore.save("coins", coins + 1).catch((error) => {
      console.log("Error saving data: ", error);
    });
    if (level >= actualLevel) {
      SimpleStore.save("level", level).catch((error) => {
        console.log("Error saving data: ", error);
      });
    }
    navigation.navigate("GuessThePlayer", { level: level - 1 });
  };

  const getPlayerToGuess = (playerId) => {
    console.log("request /", "http://34.163.192.106:5002");
    axios
      .get(`http://34.163.192.106:5002/api/player/${playerId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPlayerToGuess(response.data);
        forceRefresh();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getPlayerToGuess(route.params?.text);
    SimpleStore.get("coins").then((value) => {
      if (value) {
        setCoins(value);
      }
    });
  }, [route.params?.text]);

  useEffect(() => {
    if (playerToGuess) {
      SimpleStore.get(`guessesLevel${index}`)
        .then((value) => {
          if (value) {
            setGuesses(value);
          }
        })
        .catch((error) => {
          console.log("Error retrieving data: ", error);
        });
    }
  }, [playerToGuess, refreshTrigger]);

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

  const forceRefresh = () => {
    setRefreshTrigger(Date.now());
  };

  const renderCircles = (guess, playerIndex) => {
    const circles = [];
    const playerToGuessValues = [
      playerToGuess.nationality_name,
      playerToGuess.league_name,
      playerToGuess.club_name,
      playerToGuess.player_positions,
      playerToGuess.age.toString(),
    ];
    const playerValues = [
      guess.nationality_name,
      guess.league_name,
      guess.club_name,
      guess.player_positions,
      guess.age.toString(),
    ];
    if (guess.age > playerToGuess.age) {
      playerValues[4] += "↓";
    }
    if (guess.age < playerToGuess.age) {
      playerValues[4] += "↑";
    }
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
            <Text style={[styles.circleText, { fontSize: dynamicFontSize }]}>
              {playerValues[i]}
            </Text>
          </View>
        );
      }
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <DisplayCoins></DisplayCoins>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Guess the player : Level ${index}`}</Text>
        <Text>{`Player : ${player}`}</Text>
      </View>
      <View style={styles.searchContainer}>
        <SearchPlayer
          forceRefresh={forceRefresh}
          guesses={guesses}
          level={`${index}`}
          visible={isModalVisible}
          onClose={toggleModal}
        />

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <ScrollView>
            {guesses
              .slice()
              .reverse()
              .map((guess, index) => (
                <View key={index} style={styles.guess}>
                  <View style={styles.textAndCircleContainer}>
                    <Text style={styles.textAboveCircle}>
                      {guess.short_name}
                    </Text>
                    <View style={styles.circleContainer}>
                      {renderCircles(guess, guesses.length - 1 - index)}
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
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

      {(guesses.length == 0 ||
        player != guesses[guesses.length - 1].player_id) && (
        <TouchableOpacity
          key={`searchButton-${index}`}
          style={styles.touchableOpacity}
          onPress={() => toggleModal()}
        >
          <Text>SEARCH</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => clear()}>
        <Text>CLEAR</Text>
      </TouchableOpacity>
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
    height: 50,
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
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
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
  searchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
