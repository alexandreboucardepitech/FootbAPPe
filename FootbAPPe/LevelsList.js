import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const LevelsList = ({ stringsArray, actualLevel, setActualLevel }) => {
  const handlePress = (text, index) => {
    console.log(text);
    setActualLevel(index);
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
});

export default LevelsList;
