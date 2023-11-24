import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import imageGuessThePlayer from './assets/GuessThePlayer.png';
import imageCarrierTracer from './assets/CarrierTracer.png';
import imageClubFinder from './assets/ClubFinder.png';
import imageStarting11 from './assets/Starting11.png';

export default function MainPage() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FootbAPPé</Text>
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.column}>
          <TouchableOpacity style={styles.imageButton} onPress={() => {navigation.navigate('GuessThePlayer')}}>
            <Image
              source={imageGuessThePlayer}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={() => {navigation.navigate('CarrierTracer')}}>
            <Image
              source={imageCarrierTracer}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={styles.imageButton} onPress={() => {navigation.navigate('ClubFinder')}}>
            <Image
              source={imageClubFinder}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={() => {navigation.navigate('Starting11')}}>
            <Image
              source={imageStarting11}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});