import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import backgroundMenu from "../assets/backgroundMenu.jpg";
import nameLogo from "../assets/nameLogo.png";

export default function Menu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundMenu}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.column}>
          <View style={styles.titleContainer}>
            <Image
              source={nameLogo}
              style={styles.titleLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GameMenu");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Credits");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>CREDITS</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  titleLogo: {
    width: 400,
    height: 125,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 150,
  },
  title: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 200,
  },
  button: {
    backgroundColor: "#B3EFB2",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 50,
  },
  rectangle: {
    borderColor: "red",
    borderWidth: 2,
  },
});
