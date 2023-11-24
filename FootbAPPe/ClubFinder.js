import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LevelsList from "./LevelsList";

export default function ClubFinder() {
  const stringsArray = [
    "Zlatan Ibrahimovic",
    "Antoine Griezmann",
    "Hugo Lloris",
    "Angel Di Maria",
    "Thiago Alcantara",
    "Alvaro Morata",
    "Xavi Simons",
    "Raphaël Leao",
    "Ludovic Blas",
    "Alex Grimaldo",
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Club Finder</Text>
      </View>
      <LevelsList stringsArray={stringsArray} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    color: 'white',
  },
});
