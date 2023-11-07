import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {NGROK_URL} from "@env"

export default function GuessThePlayer() {
  const [responseData, setResponseData] = useState(null);

  const fetchData = () => {
    console.log("request /", NGROK_URL);
    axios
      .get(`${NGROK_URL}/api/data`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }})
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Guess The Player</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      {responseData && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Response from Server:</Text>
          <Text style={styles.responseData}>{JSON.stringify(responseData)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  responseContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  responseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseData: {
    marginTop: 10,
    fontSize: 16,
  },
});
