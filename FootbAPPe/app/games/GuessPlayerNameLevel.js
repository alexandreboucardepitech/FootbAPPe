import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function GuessPlayerNameLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const [inputText, setInputText] = useState("");
  const [nameProposition, setNameProposition] = useState([]);
  const isSameLength = player.length === inputText.length;
  const isSameText = player === inputText;
  const [nbLineOfCircles, setNbLineOfCircles] = useState(1);
  const windowWidth = Dimensions.get("window").width;
  const circlePadding = 0;
  const circleMargin = 10;

  const circles = Array.from(
    { length: player.length },
    (_, index) => index + 1
  );

  const circleLine = () => {
    const wordLength = player.length;
    const maxCirclesPerLine = Math.floor(
      (windowWidth - circlePadding) / (20 + circlePadding + 2 * circleMargin)
    );

    const circleSize =
      (windowWidth - circlePadding) / maxCirclesPerLine / (wordLength / 6);

    const availableWidth =
      windowWidth - circlePadding * (maxCirclesPerLine + 1);

    const lines = [];
    for (let i = 0; i < nbLineOfCircles; i++) {
      lines.push(
        <View key={i} style={styles.line}>
          {circles.map((circleIndex) => (
            <View
              key={circleIndex}
              style={checkColorCircle(i, circleIndex, circleSize)}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {nameProposition[i]
                  ? nameProposition[i][circleIndex - 1]
                  : null}
              </Text>
            </View>
          ))}
        </View>
      );
    }
    return lines;
  };

  const checkColorCircle = (lineIndex, circleIndex, circleSize) => {
    if (nameProposition[lineIndex]) {
      const guessedLetter = nameProposition[lineIndex][circleIndex - 1];
      const correctLetter = player[circleIndex - 1];

      if (guessedLetter === correctLetter) {
        return styles.rightCircle(circleSize);
      } else if (player.includes(guessedLetter)) {
        return styles.wrongPlaceCircle(circleSize);
      } else {
        return styles.defaultCircle(circleSize);
      }
    } else {
      return styles.defaultCircle(circleSize);
    }
  };

  const resetInput = () => {
    setNameProposition((prev) => [...prev, inputText]);
    setInputText("");
    setNbLineOfCircles((prev) => prev + 1);
  };

  const handlePress = (level) => {
    navigation.navigate("GuessPlayerName", { level: level - 1 });
  };

  return (
    <View style={styles.container}>
      {circleLine()}
      <TextInput
        style={styles.inputText}
        placeholder="Enter your name"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        onSubmitEditing={() =>
          isSameLength ? (isSameText ? handlePress(index) : resetInput()) : null
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const circlePadding = 0;
const circleMargin = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCircle: (circleSize) => ({
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "white",
    padding: circlePadding / 2,
    margin: circleMargin / 2,
  }),
  rightCircle: (circleSize) => ({
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "#B3EFB2",
    padding: circlePadding / 2,
    margin: circleMargin / 2,
  }),
  wrongPlaceCircle: (circleSize) => ({
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "yellow",
    padding: circlePadding / 2,
    margin: circleMargin / 2,
  }),
  inputText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
