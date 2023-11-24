import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageLocked from "./assets/locked.png";

const LevelsList = ({ stringsArray, actualLevel, redirection }) => {
  const navigation = useNavigation();

  const handlePress = (text, index) => {
    if (index <= actualLevel + 1) {
      navigation.navigate(redirection, { text: text, index: index });
    }
  };

  return (
    <ScrollView>
      {stringsArray.map((text, index) => (
        <TouchableOpacity
          key={index}
          style={styles.touchableOpacity}
          onPress={() => handlePress(text, index)}
        >
          <Text>{index > actualLevel ? `Niveau ${index + 1}` : text}</Text>
          {index > actualLevel + 1 && (
          <Image
            source={imageLocked}
            style={styles.imageStyle}
          />
        )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
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
  imageStyle: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 10,
  },
});

export default LevelsList;
