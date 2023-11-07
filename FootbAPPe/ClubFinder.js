import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ClubFinder() {
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Club Finder</Text>
      </View>
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
