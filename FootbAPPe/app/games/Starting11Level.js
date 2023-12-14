import React, { useState } from "react";
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
import axios from "axios";
import SearchPlayerS11 from "./SearchPlayerS11.js";
import backgroundGame from "../../assets/backgroundGame.jpg";

const { width, height } = Dimensions.get("window");

export default function Starting11Level() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const team = route.params?.text;

  const [position, setPosition] = useState(null);
  const [rightPlayer, setRightPlayer] = useState([false, false, false, false, false, false, false, false, false, false, false]);
  const [positionOfPlayer, setPositionOfPlayer] = useState(null);

  const handlePress = (level) => {
    navigation.navigate("Starting11", { level: level - 1 });
  };

  const setGoodPosition = (index) => {
    let rightPlayers = rightPlayer;
    rightPlayers[index] = true;
    setRightPlayer(rightPlayers);
    setModalVisible(!modalVisible);
    console.log(rightPlayer);
  }

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

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = (position, index) => {
    team.map((player) => {
      if (player[0] === position) {
        setPosition(player[1]);
        setPositionOfPlayer(index);
      }
    });

    setModalVisible(!modalVisible);
  };

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
        {playerPositions.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row &&
              row.map((position, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  onPress={() => toggleModal(position, colIndex)}
                  style={{
                    ...checkPosition(rowIndex),
                    height: width * 0.13,
                    width: width * 0.13,
                    borderRadius: 100,
                    margin: width * 0.02,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: checkPositionPlayer(position)
                      ? "white"
                      : null,
                  }}
                ></TouchableOpacity>
              ))}
          </View>
        ))}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text>Modal Content Goes Here</Text>
              <SearchPlayerS11 level={index} position={position} setGoodPosition={setGoodPosition} positionOfPlayer={positionOfPlayer}/>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  row1Style: {
    marginHorizontal: width * -0.15,
  },
  row2Style: {
    marginHorizontal: width * 0.15,
  },
  row3Style: {
    marginHorizontal: width * -0.15,
  },
  row4Style: {
    marginHorizontal: width * 0.5,
  },
  row5Style: {
    marginHorizontal: width * -0.15,
  },
  row6Style: {
    marginHorizontal: width * -0.15,
  },
  row7Style: {
    marginHorizontal: width * 0.5,
  },
  row8Style: {},
  row9Style: {},
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
