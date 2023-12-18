import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import SimpleStore from "react-native-simple-store";
import axios from "axios";
import { NGROK_URL } from "@env";
import not_found from "../../assets/not_found.png";
import { StatusBar } from "expo-status-bar";

const SearchPlayer = ({ visible, onClose, forceRefresh, guesses, level }) => {
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
    if (!guesses.includes(player)) {
      SimpleStore.save(`guessesLevel${level}`, [...guesses, player]).catch(
        (error) => {
          console.log("Error saving data: ", error);
        }
      );
      setResponseData(null);
      setSearchText(null);
      forceRefresh();
      onClose();
    }
  };

  const fetchData = () => {
    console.log("request /", "http://34.163.192.106:5002");
    axios
      .get(`http://34.163.192.106:5002/api/player/${searchText}`, {
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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}
          >
            <Text>Close Search System</Text>
          </TouchableOpacity>
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
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(player)}
                  >
                    <Text>{player.short_name}</Text>
                    <ImageBackground
                      style={styles.playerImage}
                      source={not_found}
                    >
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#008000",
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
