import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your image files
import image1 from './assets/GuessThePlayer.png';
import image2 from './assets/CarrierTracer.png';
import image3 from './assets/ClubFinder.png';
import image4 from './assets/Starting11.png';

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
              source={image1}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={() => {navigation.navigate('CarrierTracer')}}>
            <Image
              source={image2}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={styles.imageButton} onPress={() => {navigation.navigate('ClubFinder')}}>
            <Image
              source={image3}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={() => {navigation.navigate('Starting11')}}>
            <Image
              source={image4}
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