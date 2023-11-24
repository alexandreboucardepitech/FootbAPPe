import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import backgroundGame from "./assets/backgroundGame.jpg";

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
          <Text style={styles.title}>CREDITS</Text>
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.rectangle}>
            <Text>Developers: Alex et Mathis</Text>
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
  rectangle: {
    width: 300,
    height: 600,
    backgroundColor: "#B3EFB2",
    marginBottom: 30,
    borderRadius: 20,
  },
});
