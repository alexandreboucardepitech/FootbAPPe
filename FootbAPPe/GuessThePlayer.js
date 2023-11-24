import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { NGROK_URL } from "@env";
import not_found from "./assets/not_found.png";

export default function GuessThePlayer() {
  const [responseData, setResponseData] = useState(null);
  const [searchText, setSearchText] = useState("");

  const formatPlayerId = (playerId) => {
    while (playerId.length < 6) {
      playerId = "0" + playerId;
    }
    const firstThree = playerId.substring(0, 3);
    const lastThree = playerId.substring(playerId.length - 3);
    return `${firstThree}/${lastThree}`;
  };

  const fetchData = () => {
    console.log("request /", NGROK_URL);
    axios
      .get(`${NGROK_URL}/api/player/${searchText}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Guess The Player</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Fetch Data</Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by short name"
          value={searchText}
          onChangeText={setSearchText}
        />

        {responseData && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>Response from Server:</Text>
            {responseData.map((player, index) => (
              <View key={index} style={styles.playerContainer}>
                <Text style={styles.playerText}>
                  Player {index + 1}: {player.short_name}
                </Text>
                <ImageBackground style={styles.playerImage} source={not_found}>
                  <Image
                    style={styles.playerImage}
                    source={{
                      uri: `https://cdn.sofifa.net/players/${formatPlayerId(
                        player.player_id.toString()
                      )}/24_120.png`,
                    }}
                  />
                </ImageBackground>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#008000",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    color: "white",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  responseContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  responseText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  responseData: {
    marginTop: 10,
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  playerImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
});
