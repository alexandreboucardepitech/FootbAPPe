import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import SimpleStore from "react-native-simple-store";
import imageCoin from "../assets/coin.png";

const DisplayCoins = () => {
  const [coins, setCoins] = useState(0);

  SimpleStore.get("coins")
    .then((value) => {
      console.log("Retrieved data: ", value);
      setCoins(value);
    })
    .catch((error) => {
      console.log("Error retrieving data: ", error);
    });

  return (
    <View style={styles.coinContainer}>
      <Image source={imageCoin} style={styles.coinImage} resizeMode="contain" />
      <Text style={styles.coinNumber}>{coins}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  coinContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  coinNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DisplayCoins;
