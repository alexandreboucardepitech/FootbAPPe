import React, { useState, useEffect } from "react";
import { StatusBar, Dimensions } from "react-native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import backgroundGame from "../../assets/backgroundGame.jpg";

const { width, height } = Dimensions.get("window");

export default function Starting11Level() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;

  const handlePress = (level) => {
    navigation.navigate("Starting11", { level: level - 1 });
  };

  const checkPosition = (position, rowIndex) => {
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
                  style={{
                    ...checkPosition(position, rowIndex),
                    ...{
                      height: width * 0.13,
                      width: width * 0.13,
                      borderRadius: 100,
                      margin: width * 0.02,
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                ></TouchableOpacity>
              ))}
          </View>
        ))}
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
    backgroundColor: "white",
    marginHorizontal: width * -0.15,
  },
  row2Style: {
    backgroundColor: "white",
    marginHorizontal: width * 0.15,
  },
  row3Style: {
    backgroundColor: "white",
    marginHorizontal: width * -0.15,
  },
  row4Style: {
    backgroundColor: "white",
    marginHorizontal: width * 0.5,
  },
  row5Style: {
    backgroundColor: "white",
    marginHorizontal: width * -0.15,
  },
  row6Style: {
    backgroundColor: "white",
    marginHorizontal: width * -0.15,
  },
  row7Style: {
    backgroundColor: "white",
    marginHorizontal: width * 0.5,
  },
  row8Style: {
    backgroundColor: "white",
  },
  row9Style: {
    backgroundColor: "white",
  },
});
