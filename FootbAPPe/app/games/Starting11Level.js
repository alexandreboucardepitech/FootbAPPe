import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Text,
} from "react-native";
import { StatusBar, Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SearchPlayer from "./SearchPlayer.js";
import backgroundGame from "../../assets/backgroundGame.jpg";
import SimpleStore from "react-native-simple-store";
import DisplayCoins from "../DisplayCoins.js";

const { width, height } = Dimensions.get("window");

export default function Starting11Level() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const team = route.params?.text;

  const [player, setPlayer] = useState(null);
  const [rightPlayer, setRightPlayer] = useState([
    [false, false, false, false, false],
    [false],
    [false, false, false],
    [false, false, false, false, false],
    [false, false, false],
    [false, false],
    [false, false, false, false, false],
    [false],
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  const [guesses, setGuesses] = useState([
    [[], [], [], [], []],
    [[]],
    [[], [], []],
    [[], [], [], [], []],
    [[], [], []],
    [[], []],
    [[], [], [], [], []],
    [[]],
  ]);
  const [started, setStarted] = useState(false);
  const [coins, setCoins] = useState(0);

  const clear = () => {
    console.log("clear : ", team);
    team.forEach((rows) => {
      rows.forEach((eachPlayer) => {
        SimpleStore.delete(`guessesLevelStarting${index}/${eachPlayer}`);
      });
    });
    setRightPlayer([
      [false, false, false, false, false],
      [false],
      [false, false, false],
      [false, false, false, false, false],
      [false, false, false],
      [false, false],
      [false, false, false, false, false],
      [false],
    ]);
    setGuesses([
      [[], [], [], [], []],
      [[]],
      [[], [], []],
      [[], [], [], [], []],
      [[], [], []],
      [[], []],
      [[], [], [], [], []],
      [[]],
    ]);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePress = (level) => {
    SimpleStore.save("coins", coins + 1).catch((error) => {
      console.log("Error saving data: ", error);
    });
    navigation.navigate("Starting11", { level: level - 1 });
  };

  const levels = [
    "Manchester City",
    "FC Barcelone",
    "Olympique de Marseille",
    "Borussia Dortmund",
    "Aston Villa",
    "Bayer Leverkusen",
    "AS Roma",
    "Séville FC",
    "PSV Eindhoven",
    "FC Nantes",
  ];

  const levelCompleted = () => {
    let count = 0;
    rightPlayer.forEach((row) => {
      row.forEach((value) => {
        if (value === true) {
          count++;
        }
      });
    });
    if (count == 11) return true;
    return false;
  };

  const openModal = (rowIndex, index) => {
    console.log("here :", team[rowIndex][index]);
    setPlayer(team[rowIndex][index]);

    let found = false;
    guesses[rowIndex][index].forEach((guess, guessIndex) => {
      if (guess.player_id == team[rowIndex][index]) found = true;
    });
    if (!found) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const forceRefresh = () => {
    setRefreshTrigger(Date.now());
  };

  const getGuesses = () => {
    let guessesToReturn = null;

    team.forEach((rows, rowIndex) => {
      rows.forEach((eachPlayer, index) => {
        if (eachPlayer === player) {
          guessesToReturn = guesses[rowIndex][index];
        }
      });
    });
    return guessesToReturn;
  };

  const updateAllGuesses = () => {
    team.forEach((rows, rowIndex) => {
      rows.forEach((eachPlayer, columnIndex) => {
        SimpleStore.get(`guessesLevelStarting${index}/${eachPlayer}`)
          .then((value) => {
            if (value) {
              console.log("values : ", value);
              let guessesCopy = guesses;
              guessesCopy[rowIndex][columnIndex] = value;
              setGuesses(guessesCopy);

              value.forEach((valuePlayers, valueIndex) => {
                if (valuePlayers.player_id == team[rowIndex][columnIndex]) {
                  let rightPlayersCopy = rightPlayer;
                  rightPlayersCopy[rowIndex][columnIndex] = true;
                  setRightPlayer(rightPlayersCopy);
                  console.log("rightcopy : ", rightPlayersCopy);
                }
              });

              if (
                Array.isArray(value) &&
                value.includes(team[rowIndex][columnIndex])
              ) {
                let rightPlayersCopy = rightPlayer;
                rightPlayersCopy[rowIndex][columnIndex] = true;
                setRightPlayer(rightPlayersCopy);
                console.log("rightcopy : ", rightPlayersCopy);
              }
              console.log("rightplayer : ", rightPlayer);
            }
          })
          .catch((error) => {
            console.log("Error retrieving data: ", error);
          });
      });
    });
  };

  useEffect(() => {
    updateAllGuesses();
    SimpleStore.get("coins").then((value) => {
      console.log("Retrieved datadela: ", value);
      if (value) {
        setCoins(value);
      }
    });
  }, [guesses, refreshTrigger]);

  const renderPlayers = () => {
    return (
      <View style={styles.playersContainer}>
        {team.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((position, index) => (
              <View key={index}>
                {position != null && (
                  <View>
                    <TouchableOpacity
                      style={{
                        height: width * 0.13,
                        width: width * 0.13,
                        borderRadius: 100,
                        margin: width * 0.06,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          rightPlayer[rowIndex][index] == true
                            ? "#00FF00"
                            : "white",
                      }}
                      onPress={() => openModal(rowIndex, index)}
                    >
                      {rightPlayer[rowIndex][index] == true && <Text>✓</Text>}
                    </TouchableOpacity>
                    {rightPlayer[rowIndex][index] == true && (
                      <Text>
                        {
                          guesses[rowIndex][index][
                            guesses[rowIndex][index].length - 1
                          ].short_name
                        }
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
        <View style={styles.searchContainer}>
          <SearchPlayer
            visible={isModalVisible}
            onClose={toggleModal}
            forceRefresh={forceRefresh}
            guesses={getGuesses()}
            level={`Starting${index}/${player}`}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!started ? (
        <View style={styles.startTitleContainer}>
          <DisplayCoins key={"Starting11Title"}></DisplayCoins>
          <Text style={styles.startTitle}>{`Level ${index} : ${
            levels[index - 1]
          }\n`}</Text>
          <TouchableOpacity
            onPress={() => setStarted(true)}
            key={`finishButton-${index}`}
            style={styles.touchableOpacity}
          >
            <Text>START</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => clear()}>
            <Text>CLEAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ImageBackground
          source={backgroundGame}
          resizeMode="cover"
          style={styles.image}
        >
          <DisplayCoins key={"Starting11"}></DisplayCoins>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{`Level ${index} : ${
              levels[index - 1]
            }`}</Text>
          </View>
          {renderPlayers()}
          {levelCompleted() && (
            <TouchableOpacity
              key={`finishButton-${index}`}
              style={styles.touchableOpacity}
              onPress={() => handlePress(index)}
            >
              <Text>FINISH</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => clear()}>
            <Text>CLEAR</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
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
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  startTitle: {
    fontSize: 24,
    color: "white",
    marginTop: 40,
  },
  startTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacity: {
    backgroundColor: "#B3EFB2",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
  },
  searchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    flex: 1,
  },
  playersContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: height * 0.03,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    width: width,
    height: height * 0.5,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
