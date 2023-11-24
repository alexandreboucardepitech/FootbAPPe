import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./MainPage.js";
import GuessThePlayer from "./GuessThePlayer.js";
import ClubFinder from "./ClubFinder.js";
import CarrerTracer from "./CarrerTracer.js";
import Starting11 from "./Starting11.js";
import CarrerTracerLevel from "./CarrerTracerLevel.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuessThePlayer"
          component={GuessThePlayer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClubFinder"
          component={ClubFinder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CarrerTracer"
          component={CarrerTracer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CarrerTracerLevel"
          component={CarrerTracerLevel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Starting11"
          component={Starting11}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
