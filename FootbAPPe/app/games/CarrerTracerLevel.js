import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function CarrerTracerLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const [playerCarrer, setPlayerCarrer]= useState(null);

  const handlePress = (level) => {
    navigation.navigate("CarrerTracer", { level: level - 1 });
  };

  const carrers = [
    {player: 20801, carrer: [
      { id: 237, dates: "2002-2003" }, //sporting cp
      { id: 11, dates: "2003-2009" }, // manchester united
      { id: 243, dates: "2009-2018" }, // real madrid
      { id: 45, dates: "2018-2021" }, // juventus
      { id: 11, dates: "2021-2022" }, // manchester united
      { id: 112139, dates: "2023-" }, // al nasser
    ]},
    {player: 194765, carrer: [
      { id: 457, dates: "2009-2014" }, // real sociedad
      { id: 240, dates: "2014-2019" }, // atletico madrid
      { id: 241, dates: "2019-2021" }, // barcelone
      { id: 240, dates: "2021-" }, // atletico madrid
    ]},
    {player: 167948, carrer: [
      { id: 72, dates: "2005-2008" }, // nice
      { id: 66, dates: "2008-2012" }, //lyon
      { id: 18, dates: "2012-" }, // totenham
    ]},
    {player: 183898, carrer: [
      { id: 110580, dates: "2005-2007" }, //rosario central
      { id: 234, dates: "2007-2010" }, //benfica
      { id: 243, dates: "2010-2014" }, //real madrid
      { id: 11, dates: "2014-2015" }, // manchester united
      { id: 73, dates: "2015-2022" }, //psg
      { id: 45, dates: "2022-2023" }, //juventus
      { id: 234, dates: "2023-" }, //benfica
    ]},
    {player: 213345, carrer: [
      { id: 73, dates: "2013-2014" }, //psg
      { id: 45, dates: "2014-2015" }, //juventus
      { id: 21, dates: "2015-" }, //bayern munich
    ]},
    {player: 189509, carrer: [
      { id: 241, dates: "2009-2013" }, // barcelone
      { id: 21, dates: "2013-2020" }, //bayern munich
      { id: 9, dates: "2020-" }, //liverpool
    ]},
    {player: 201153, carrer: [
      { id: 243, dates: "2010-2014" }, //real madrid
      { id: 45, dates: "2014-2016" }, //juventus
      { id: 243, dates: "2016-2017" }, //real madrid
      { id: 5, dates: "2017-2019" }, //chelsea
      { id: 240, dates: "2019-2020" }, // atletico madrid
      { id: 45, dates: "2020-2022" }, //juventus
      { id: 240, dates: "2022-" }, // atletico madrid
    ]},
    {player: 241721, carrer: [
      { id: 237, dates: "2017-2018" }, //sporting cp
      { id: 65, dates: "2018-2019" }, // lille
      { id: 47, dates: "2019-" }, // ac milan
    ]},
    {player: 231102, carrer: [
      { id: 62, dates: "2015-2019" }, //guingamp
      { id: 71, dates: "2019-2023" }, //nantes
      { id: 74, dates: "2023-" }, //rennes
    ]},
    {player: 210035, carrer: [
      { id: 241, dates: "2011-2016" }, // barcelone
      { id: 234, dates: "2016-2023" }, // benfica
      { id: 32, dates: "2023-" }, // leverkusen
    ]},
  ];

  const getplayerCarrer = () => {
    const foundCarrer = carrers.find((eachCarrer) => player === eachCarrer.player);

  if (foundCarrer) {
    foundCarrer.carrer.map((club) => {
      console.log(club.id, club.dates);
    });
    return foundCarrer.carrer;
  } else {
    return "carrer not found";
  }
  };

  useEffect(() => {
    setPlayerCarrer(getplayerCarrer());
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Carrer Tracer : Level ${index}`}</Text>
        <Text>{`Player : ${player} / carrer : ${playerCarrer}`}</Text>
      </View>
      <TouchableOpacity
        key={index}
        style={styles.touchableOpacity}
        onPress={() => handlePress(index)}
      >
        <Text>FINISH</Text>
      </TouchableOpacity>
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
