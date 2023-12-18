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

const { width, height } = Dimensions.get("window");

export default function Starting11Level() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const team = route.params?.text;

  const [player, setPlayer] = useState(null);
  const [rightPlayer, setRightPlayer] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false],
    [false, false, false],
    [false, false, false],
    [false, false],
    [false, false, false, false, false],
    [false],
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  const [guesses, setGuesses] = useState([
    [[], [], []],
    [[], [], []],
    [[], [], []],
    [[], []],
    [[], [], []],
    [[], [], []],
    [[], []],
    [[], [], [], [], []],
    [[]],
  ]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePress = (level) => {
    navigation.navigate("Starting11", { level: level - 1 });
  };

  // const setGoodPosition = (index) => {
  //   let rightPlayers = rightPlayer;
  //   rightPlayers[index] = true;
  //   setRightPlayer(rightPlayers);
  //   setModalVisible(!modalVisible);
  //   console.log(rightPlayer);
  // };

  const checkPosition = (rowIndex) => {
    if (rowIndex === 0) {
      return styles.row1Style;
    } else if (rowIndex === 1) {
      return styles.row2Style;
    } else if (rowIndex === 2) {
      return styles.row3Style;
    } else if (rowIndex === 3) {
      return styles.row4Style;
    } else if (rowIndex === 4) {
      return styles.row5Style;
    } else if (rowIndex === 5) {
      return styles.row6Style;
    } else if (rowIndex === 6) {
      return styles.row7Style;
    } else if (rowIndex === 7) {
      return styles.row8Style;
    } else if (rowIndex === 8) {
      return styles.row9Style;
    }
  };

  const checkPositionPlayer = (position) => {
    return team.some((player) => player[0] === position);
  };

  const openModal = (rowIndex, index) => {
    console.log("here :", team[rowIndex][index]);
    setPlayer(team[rowIndex][index]);

    let found = false
    guesses[rowIndex][index].forEach((guess, guessIndex) => {
      if (guess.player_id == team[rowIndex][index])
        found = true;
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
    console.log("dbiabdazbdzoandzapndza", guessesToReturn);
    return guessesToReturn;
  };

  const updateAllGuesses = () => {
    team.forEach((rows, rowIndex) => {
      rows.forEach((eachPlayer, columnIndex) => {
        SimpleStore.get(`guessesLevelStarting${index}/${eachPlayer}`)
          .then((value) => {
            console.log("aaa");
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
    console.log("vvv");
    // setGuesses([
    //   [[], [], []],
    //   [[], [], []],
    //   [[], [], []],
    //   [[], []],
    //   [[], [], []],
    //   [[], [], []],
    //   [[], []],
    //   [[], [], [], [], []],
    //   [[]],
    // ]);
    if (player) {
      updateAllGuesses();
      // SimpleStore.get(`guessesLevelStarting${index}/165153`)
      //   .then((value) => {
      //     console.log("aaa");
      //     if (value) {
      //       console.log("values : ", value);
      //       setGuesses([
      //         [[], [], []],
      //         [[], [], []],
      //         [[], value, []],
      //         [[], []],
      //         [[], [], []],
      //         [[], [], []],
      //         [[], []],
      //         [[], [], [], [], []],
      //         [[]],
      //       ]);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("Error retrieving data: ", error);
      //   });
    }
  }, [player, refreshTrigger]);

  const renderPlayers = () => {
    const playerPositions = [
      ["bug", "bu", "bud"],
      ["ag", "at", "ad"],
      ["mog", "moc", "mod"],
      ["mg", "md"],
      ["mcg", "mc", "mcd"],
      ["mdg", "mdc", "mdd"],
      ["dlg", "dld"],
      ["dg", "dcg", "dc", "dcd", "dd"],
      ["g"],
    ];

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
                        margin: width * 0.05,
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
      <ImageBackground
        source={backgroundGame}
        resizeMode="cover"
        style={styles.image}
      >
        {renderPlayers()}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
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
