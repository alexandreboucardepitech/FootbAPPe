import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import backgroundGame from "../assets/backgroundGame.jpg";
import imageGuessThePlayer from "../assets/GuessThePlayer.png";
import imageCarrerTracer from "../assets/CarrerTracer.png";
import imageGuessPlayerName from "../assets/GuessPlayerName.png";
import imageStarting11 from "../assets/Starting11.png";

export default function GameMenu() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundGame}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select Game</Text>
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.column}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => {
                navigation.navigate("GuessThePlayer", { level: -1 });
              }}
            >
              <Image
                source={imageGuessThePlayer}
                style={styles.gameLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => {
                navigation.navigate("CarrerTracer", { level: -1 });
              }}
            >
              <Image
                source={imageCarrerTracer}
                style={styles.gameLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => {
                navigation.navigate("GuessPlayerName", { level: -1 });
              }}
            >
              <Image
                source={imageGuessPlayerName}
                style={styles.gameLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => {
                navigation.navigate("Starting11", { level: -1 });
              }}
            >
              <Image
                source={imageStarting11}
                style={styles.gameLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  gameLogo: {
    width: 250,
    height: 250,
    marginTop: -40,
    marginBottom: 40,
  },
});
