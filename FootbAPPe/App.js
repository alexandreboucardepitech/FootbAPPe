import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Menu from "./app/Menu.js";
import GameMenu from "./app/GameMenu.js";
import Credits from "./app/Credits.js";
import GuessThePlayer from "./app/games/GuessThePlayer.js";
import ClubFinder from "./app/games/ClubFinder.js";
import CarrerTracer from "./app/games/CarrerTracer.js";
import Starting11 from "./app/games/Starting11.js";
import CarrerTracerLevel from "./app/games/CarrerTracerLevel.js";
import ClubFinderLevel from "./app/games/ClubFinderLevel.js";
import Starting11Level from "./app/games/Starting11Level.js";
import GuessThePlayerLevel from "./app/games/GuessThePlayerLevel.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameMenu"
          component={GameMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Credits"
          component={Credits}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuessThePlayer"
          component={GuessThePlayer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuessThePlayerLevel"
          component={GuessThePlayerLevel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClubFinder"
          component={ClubFinder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClubFinderLevel"
          component={ClubFinderLevel}
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
        <Stack.Screen
          name="Starting11Level"
          component={Starting11Level}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
