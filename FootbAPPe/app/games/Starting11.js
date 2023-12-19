import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";
import DisplayCoins from "../DisplayCoins.js";

export default function Starting11() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);
  const idArray = [
    [
      [206517, null, 239085, null, 237692],
      [null],
      [null, 192985, null],
      [null, 231866, null, 218667, null],
      [null, null, null],
      [null, null],
      [251517, 239818, null, 208920, 188377],
      [210257],
    ],
    [
      [242444, null, 188545, null, 233419],
      [null],
      [null, null, null],
      [null, 228702, 186942, 251854, null],
      [null, null, null],
      [null, null],
      [210514, 253163, null, 213661, 241486],
      [192448],
    ],
    [
      [null, 263829, null, 188567, null],
      [null],
      [null, 232097, null],
      [251573, 201519, null, 255125, 235353],
      [null, null, null],
      [null, null],
      [null, 210897, 219581, 242835, null],
      [221087],
    ],
    [
      [251852, null, 205431, null, 231447],
      [null],
      [null, 188350, null],
      [null, null, null, null, null],
      [204923, null, 208333],
      [null, null],
      [229891, 247819, null, 178603, 224425],
      [235073],
    ],
    [
      [null, null, 221697, null, null],
      [null],
      [null, 216393, null],
      [210881, 205498, null, 236987, 229906],
      [null, null, null],
      [null, null],
      [200458, 241464, null, 219693, 227678],
      [202811],
    ],
    [
      [null, null, 247679, null, null],
      [null],
      [256630, null, 210324],
      [210035, 231521, null, 199503, 253149],
      [null, null, null],
      [null, null],
      [null, 247263, 213331, 246875, null],
      [190941],
    ],
    [
      [null, 192505, null, 211110, null],
      [null],
      [null, null, null],
      [202884, 208268, 207439, 262171, 222558],
      [null, null, null],
      [null, null],
      [null, 236403, 212602, 229582, null],
      [178005],
    ],
    [
      [231416, null, 235410, null, 205632],
      [null],
      [null, 168651, null],
      [null, null, null, null, null],
      [184134, null, 229752],
      [null, null],
      [224334, 155862, null, 255106, 146536],
      [227290],
    ],
    [
      [260020, null, 189805, null, 265450],
      [null],
      [null, null, null],
      [null, 259480, 235663, 253109, null],
      [null, null, null],
      [null, null],
      [251804, 225863, null, 235149, 245211],
      [215223],
    ],
    [
      [216820, null, 254247, null, 209288],
      [null],
      [null, null, null],
      [null, 224019, 183394, 251675, null],
      [null, null, null],
      [null, null],
      [261616, 213868, null, 233885, 226414],
      [231691],
    ],
  ];
  const stringsArray = [
      "Manchester City",
      "FC Barcelone",
      "Olympique de Marseille",
      "Borussia Dortmund",
      "Aston Villa",
      "Bayer Leverkusen",
      "AS Roma",
      "Séville FC",
      "PSV Eindhoven",
      "FC Nantes",
  ];

  useEffect(() => {
    setActualLevel(route.params?.level);
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
      <DisplayCoins></DisplayCoins>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Starting 11</Text>
      </View>
      <LevelsList
        idArray={idArray}
        stringsArray={stringsArray}
        actualLevel={actualLevel}
        redirection={"Starting11Level"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    color: "white",
  },
});
