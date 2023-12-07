import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import backgroundGame from "../../assets/backgroundGame.jpg";

export default function GuessPlayerNameLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const scrollViewRef = useRef(null); // Create a ref for ScrollView

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const [inputText, setInputText] = useState("");
  const [nameProposition, setNameProposition] = useState([]);
  const isSameLength = player.length === inputText.length;
  const isSameText = player === inputText;
  const [nbLineOfCircles, setNbLineOfCircles] = useState(1);

  const circles = Array.from(
    { length: player.length },
    (_, index) => index + 1
  );

  const maxCircleSize = 40;
  const minCircleSize = 25;

  const calculateCircleSize = () => {
    const numCircles = Math.min(10, player.length);

    if (player.length <= 6) {
      return maxCircleSize;
    } else {
      const dynamicSize =
        maxCircleSize -
        ((maxCircleSize - minCircleSize) / (10 - 6)) * (numCircles - 6);
      return Math.max(minCircleSize, dynamicSize);
    }
  };

  const circleLine = () => {
    const lines = [];
    for (let i = 0; i < nbLineOfCircles; i++) {
      lines.push(
        <View key={i} style={styles.line}>
          {circles.map((circleIndex) => (
            <View
              key={circleIndex}
              style={{
                ...checkColorCircle(i, circleIndex),
                width: calculateCircleSize(),
                height: calculateCircleSize(),
                borderRadius: calculateCircleSize() / 2,
                margin: 5,
              }}
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

  const resetInput = () => {
    setNameProposition((prev) => [...prev, inputText]);
    setInputText("");
    setNbLineOfCircles((prev) => prev + 1);

    // Scroll to the bottom after adding a new line
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handlePress = (level) => {
    navigation.navigate("GuessPlayerName", { level: level - 1 });
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={backgroundGame}
        resizeMode="cover"
        style={styles.image}
      > */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
        >
          <View style={styles.lineContainer}>{circleLine()}</View>
        </ScrollView>
        <TextInput
          style={styles.inputText}
          placeholder="Player name"
          value={inputText}
          autoCapitalize="characters"
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={() =>
            isSameLength
              ? isSameText
                ? handlePress(index)
                : resetInput()
              : null
          }
        />
      {/* </ImageBackground> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    marginTop: "33%",
    marginBottom: "10%",
    marginHorizontal: "1%",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#1A5D1A",
  },
  lineContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCircle: {
    backgroundColor: "white",
  },
  rightCircle: {
    backgroundColor: "#B3EFB2",
  },
  wrongPlaceCircle: {
    backgroundColor: "yellow",
  },
  inputText: {
    fontSize: 20,
    height: 40,
    backgroundColor: "white",
    marginBottom: "60%",
    textAlign: "center",
    borderRadius: 10,
    marginHorizontal: 40,
  },
});
