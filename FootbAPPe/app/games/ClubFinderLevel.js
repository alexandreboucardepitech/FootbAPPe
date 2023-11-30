import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function ClubFinderLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const handlePress = (level) => {
    navigation.navigate("ClubFinder", { level: level - 1 });
  };

  const circles = Array.from(
    { length: player.length },
    (_, index) => index + 1
  );

  const [inputText, setInputText] = useState("");
  const [nameProposition, setNameProposition] = useState([]);
  const isSameLength = player.length === inputText.length;
  const isSameText = player === inputText;
  const [nbLineOfCircles, setNbLineOfCircles] = useState(1);

  const checkColorCircle = (lineIndex, circleIndex) => {
    if (nameProposition[lineIndex]) {
      const guessedLetter = nameProposition[lineIndex][circleIndex - 1];
      const correctLetter = player[circleIndex - 1];

      if (guessedLetter === correctLetter) {
        return styles.rightCircle;
      } else if (player.includes(guessedLetter)) {
        return styles.wrongPlaceCircle;
      } else {
        return styles.defaultCircle;
      }
    } else {
      return styles.defaultCircle;
    }
  };

  const circleLine = () => {
    const lines = [];
    for (let i = 0; i < nbLineOfCircles; i++) {
      lines.push(
        <View key={i} style={styles.line}>
          {circles.map((circleIndex) => (
            <View key={circleIndex} style={checkColorCircle(i, circleIndex)}>
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

  const resetInput = () => {
    setNameProposition((prev) => [...prev, inputText]);
    setInputText("");
    setNbLineOfCircles((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text>{player}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    marginTop: 50,
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
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
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
  defaultCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
  },
  rightCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#B3EFB2",
    margin: 5,
  },
  wrongPlaceCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "yellow",
    margin: 5,
  },
});
