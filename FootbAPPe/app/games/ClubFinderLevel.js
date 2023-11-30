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
  const isSameLength = player.length === inputText.length;

  const [nbLineOfCircles, setNbLineOfCircles] = useState(1);

  const circleLine = () => {
    const lines = [];
    for (let i = 0; i < nbLineOfCircles; i++) {
      lines.push(
        <View key={i} style={styles.line}>
          {circles.map((index) => (
            <View key={index} style={styles.circle} />
          ))}
        </View>
      );
    }
    return lines;
  };

  const resetInput = () => {
    setInputText("");
    setNbLineOfCircles((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text>{player}</Text>
      <TextInput
        placeholder="Enter your name"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        clearTextOnFocus={true}
      />

      {circleLine()}
      {isSameLength && <Text style={styles.sameLengthText}>SAME LENGTH</Text>}
      <TouchableOpacity
        key={index}
        style={styles.touchableOpacity}
        onPress={() => resetInput()}
      >
        <Text>FINISH</Text>
      </TouchableOpacity>
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
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
  },
  sameLengthText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
  },
});
