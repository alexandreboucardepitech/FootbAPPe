import React, { useState } from "react";
import axios from "axios";
import { NGROK_URL } from "@env";
import not_found from "../../assets/not_found.png";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import SimpleStore from "react-native-simple-store";

const SearchPlayer = ({ forceRefresh, guesses, addTeamLogo, level }) => {
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

  const handlePress = (player) => {
    console.log("aaa")
    if (!guesses.includes(player)) {
      console.log("vv")
      SimpleStore.save(`guessesLevel${level}`, [...guesses, player])
        .then(() => {
          console.log("Data saved successfully!", [...guesses, player]);
        })
        .catch((error) => {
          console.log("Error saving data: ", error);
        });
      // setGuesses([...guesses, player]);
      addTeamLogo(player);
      setResponseData(null);
      setSearchText(null);
      forceRefresh();
    }
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}> SEARCH </Text>
      </TouchableOpacity>

      <KeyboardAvoidingView>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a player"
          value={searchText}
          onChangeText={setSearchText}
        />
      </KeyboardAvoidingView>

      {responseData && (
        <View style={styles.responseContainer}>
          <ScrollView>
            {responseData.map((player, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(player)}>
                <Text>{player.short_name}</Text>
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
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    alignItems: "center",
  },
  button: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  responseContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    height: 210,
  },
  responseText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  playerImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
});

export default SearchPlayer;
