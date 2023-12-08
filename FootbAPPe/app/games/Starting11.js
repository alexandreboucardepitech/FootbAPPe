import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsList from "./LevelsList.js";
import { useRoute } from "@react-navigation/native";

export default function Starting11() {
  const route = useRoute();
  const [actualLevel, setActualLevel] = useState(route.params?.level);
  const idArray = [
    165153, //Karim Benzema
    194765, //Antoine Griezmann
    167948, //Hugo Lloris
    183898, //Di Maria
    189509, //Thiago Alcantara
    201153, //Alvaro Morata
    245367, //Xavi Simons
    241721, //Rafael Leao
    231102, //Ludovic Blas
    210035, //Alex Grimaldo
  ];
  const stringsArray = [
    [
      "G : Ederson",
      "DD : Walker",
      "DCG : Akanji",
      "DCD : Aké",
      "DG : Gvardiol",
      "MCG : Rodri",
      "MCD : Kovacic",
      "MOC : De Bruyne",
      "AG : Grealish",
      "AD : Foden",
      "BU : Haaland",
    ],
    [
      "G : Donnarumma",
      "DD : Di Lorenzo",
      "DCG : Bonucci",
      "DCD : Chiellini",
      "DG : Spinazzola",
      "MCG : Barella",
      "MCD : Jorginho",
      "MOC : Verratti",
      "AG : Chiesa",
      "AD : Immobile",
      "BU : Insigne",
    ],
    [
      "G : Pickford",
      "DD : Walker",
      "DCG : Stones",
      "DCD : Maguire",
      "DG : Shaw",
      "MCG : Phillips",
      "MCD : Rice",
      "MOC : Mount",
      "AG : Sterling",
      "AD : Kane",
      "BU : Foden",
    ],
    [
      "G : Lloris",
      "DD : Pavard",
      "DCG : Varane",
      "DCD : Kimpembe",
      "DG : Hernandez",
      "MCG : Pogba",
      "MCD : Kante",
      "MOC : Griezmann",
      "AG : Mbappe",
      "AD : Benzema",
      "BU : Coman",
    ],
    [
      "G : Sommer",
      "DD : Elvedi",
      "DCG : Akanji",
      "DCD : Rodriguez",
      "DG : Mbabu",
      "MCG : Freuler",
      "MCD : Xhaka",
      "MOC : Shaqiri",
      "AG : Embolo",
      "AD : Seferovic",
      "BU : Gavranovic",
    ],
    [
      "G : Hradecky",
      "DD : Arajuuri",
      "DCG : Toivio",
      "DCD : O'Shaughnessy",
      "DG : Uronen",
      "MCG : Kamara",
      "MCD : Sparv",
      "MOC : Lod",
      "AG : Pohjanpalo",
      "AD : Pukki",
      "BU : Lappalainen",
    ],
  ];

  useEffect(() => {
    setActualLevel(route.params?.level);
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
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
