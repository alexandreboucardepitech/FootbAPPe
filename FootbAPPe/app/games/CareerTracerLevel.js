import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SimpleStore from "react-native-simple-store";
import SearchPlayer from "./SearchPlayer.js";
import { NGROK_URL } from "@env";
import axios from "axios";

export default function CareerTracerLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const [playerCareer, setPlayerCareer] = useState(null);
  const [progression, setProgression] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  const [playerToGuess, setPlayerToGuess] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePress = (level) => {
    SimpleStore.save("CareerTracerLevel", level).catch((error) => {
      console.log("Error saving data: ", error);
    });
    navigation.navigate("CareerTracer", { level: level - 1 });
  };

  const clear = () => {
    SimpleStore.delete(`guessesLevelCareer${index}`);
    SimpleStore.delete(`CareerTracerLevel${index}Progression`);
    setGuesses([]);
  };

  const getPlayerToGuess = (playerId) => {
    console.log("request /", "http://34.163.192.106:5002");
    axios
      .get(`http://34.163.192.106:5002/api/player/${playerId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPlayerToGuess(response.data);
        forceRefresh();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const changeProgression = (newProgression) => {
    SimpleStore.save(
      `CareerTracerLevel${index}Progression`,
      newProgression
    ).catch((error) => {
      console.log("Error saving data: ", error);
    });
    setProgression(newProgression);
  };

  useEffect(() => {
    if (playerCareer && player) {
      SimpleStore.get(`guessesLevelCareer${index}`)
        .then((value) => {
          if (value) {
            setGuesses(value);
            changeProgression(value.length + 1);
          } else {
            changeProgression(1);
          }
        })
        .catch((error) => {
          console.log("Error retrieving data: ", error);
        });
    }
  }, [playerToGuess, playerCareer, refreshTrigger]);

  const careers = [
    {
      player: 20801,
      career: [
        {
          logo: "/meta/team/58/60.png",
          dates: "2002-2003",
          name: "Sporting CP",
        }, //sporting cp
        {
          logo: "/meta/team/14/60.png",
          dates: "2003-2009",
          name: "Manchester United",
        }, // manchester united
        {
          logo: "/meta/team/3468/60.png",
          dates: "2009-2018",
          name: "Real Madrid",
        }, // real madrid
        {
          logo: "/meta/team/625/60.png",
          dates: "2018-2021",
          name: "Juventus Turin",
        }, // juventus
        {
          logo: "/meta/team/14/60.png",
          dates: "2021-2022",
          name: "Manchester United",
        }, // manchester united
        { logo: "/meta/team/2506/60.png", dates: "2023-now", name: "AL-Nassr" }, // al nasser
      ],
    },
    {
      player: 194765,
      career: [
        {
          logo: "/meta/team/594/60.png",
          dates: "2009-2014",
          name: " Real Sociedad",
        }, // real sociedad
        {
          logo: "/meta/team/7980/60.png",
          dates: "2014-2019",
          name: "Atletico Madrid",
        }, // atletico madrid
        {
          logo: "/meta/team/83/60.png",
          dates: "2019-2021",
          name: "FC Barcelone",
        }, // barcelone
        {
          logo: "/meta/team/7980/60.png",
          dates: "2021-now",
          name: "Atletico Madrid",
        }, // atletico madrid
      ],
    },
    {
      player: 167948,
      career: [
        { logo: "/meta/team/450/60.png", dates: "2005-2008", name: "OGC Nice" }, // nice
        {
          logo: "/meta/team/79/60.png",
          dates: "2008-2012",
          name: "Olympique Lyonnais",
        }, //lyon
        { logo: "/meta/team/6/60.png", dates: "2012-now", name: "Tottenham" }, // tottenham
      ],
    },
    {
      player: 183898,
      career: [
        { logo: "", dates: "2005-2007", name: "Rosario Central" }, //rosario central
        {
          logo: "/meta/team/605/60.png",
          dates: "2007-2010",
          name: "Benfica Lisbonne",
        }, //benfica
        {
          logo: "/meta/team/3468/60.png",
          dates: "2010-2014",
          name: "Real Madrid",
        }, //real madrid
        {
          logo: "/meta/team/14/60.png",
          dates: "2014-2015",
          name: "Manchester United",
        }, // manchester united
        {
          logo: "/meta/team/591/60.png",
          dates: "2015-2022",
          name: "Paris Saint-Germain",
        }, //psg
        {
          logo: "/meta/team/625/60.png",
          dates: "2022-2023",
          name: "Juventus Turin",
        }, //juventus
        {
          logo: "/meta/team/605/60.png",
          dates: "2023-now",
          name: "Benfica Lisbonne",
        }, //benfica
      ],
    },
    {
      player: 213345,
      career: [
        {
          logo: "/meta/team/591/60.png",
          dates: "2013-2014",
          name: "Paris Saint-Germain",
        }, //psg
        {
          logo: "/meta/team/625/60.png",
          dates: "2014-2015",
          name: "Juventus Turin",
        }, //juventus
        {
          logo: "/meta/team/503/60.png",
          dates: "2015-now",
          name: "Bayern Munich",
        }, //bayern munich
      ],
    },
    {
      player: 189509,
      career: [
        {
          logo: "/meta/team/83/60.png",
          dates: "2009-2013",
          name: "FC Barcelone",
        }, // barcelone
        {
          logo: "/meta/team/503/60.png",
          dates: "2013-2020",
          name: "Bayern Munich",
        }, //bayern munich
        { logo: "/meta/team/8/60.png", dates: "2020-now", name: "Liverpool" }, //liverpool
      ],
    },
    {
      player: 201153,
      career: [
        {
          logo: "/meta/team/3468/60.png",
          dates: "2010-2014",
          name: "Real Madrid",
        }, //real madrid
        {
          logo: "/meta/team/625/60.png",
          dates: "2014-2016",
          name: "Juventus Turin",
        }, //juventus
        {
          logo: "/meta/team/3468/60.png",
          dates: "2016-2017",
          name: "Real Madrid",
        }, //real madrid
        { logo: "/meta/team/18/60.png", dates: "2017-2019", name: "Chelsea" }, //chelsea
        {
          logo: "/meta/team/7980/60.png",
          dates: "2019-2020",
          name: "Atletico Madrid",
        }, // atletico madrid
        {
          logo: "/meta/team/625/60.png",
          dates: "2020-2022",
          name: "Juventus Turin",
        }, //juventus
        {
          logo: "/meta/team/7980/60.png",
          dates: "2022-now",
          name: "Atletico Madrid",
        }, // atletico madrid
      ],
    },
    {
      player: 241721,
      career: [
        {
          logo: "/meta/team/58/60.png",
          dates: "2017-2018",
          name: "Sporting CP",
        }, //sporting cp
        {
          logo: "/meta/team/690/60.png",
          dates: "2018-2019",
          name: "Losc Lille",
        }, // lille
        { logo: "/meta/team/113/60.png", dates: "2019-now", name: "AC Milan" }, // ac milan
      ],
    },
    {
      player: 231102,
      career: [
        { logo: "", dates: "2015-2019", name: "EA Guingamp" }, //guingamp
        { logo: "/meta/team/59/60.png", dates: "2019-2023", name: "FC Nantes" }, //nantes
        {
          logo: "/meta/team/598/60.png",
          dates: "2023-now",
          name: "Stade Rennais",
        }, //rennes
      ],
    },
    {
      player: 210035,
      career: [
        {
          logo: "/meta/team/83/60.png",
          dates: "2011-2016",
          name: "FC Barcelone",
        }, // barcelone
        {
          logo: "/meta/team/605/60.png",
          dates: "2016-2023",
          name: "Benfica Lisbonne",
        }, // benfica
        {
          logo: "/meta/team/3321/60.png",
          dates: "2023-now",
          name: "Bayer Leverkusen",
        }, // leverkusen
      ],
    },
  ];

  const getplayerCareer = () => {
    const foundCareer = careers.find(
      (eachCareer) => player === eachCareer.player
    );

    if (foundCareer) {
      forceRefresh();
      getPlayerToGuess(foundCareer.player);
      return foundCareer.career;
    } else {
      return "career not found";
    }
  };

  SimpleStore.get(`CareerTracerLevel${index}Progression`)
    .then((value) => {
      setProgression(value);
    })
    .catch((error) => {
      console.log("Error retrieving data: ", error);
    });

  useEffect(() => {
    setPlayerCareer(getplayerCareer());
  }, [route.params?.level]);

  const getCircleColor = (playerPos, guessPos) => {
    if (playerPos == guessPos) {
      return styles.greenCircle;
    }
    const playerAllPos = playerPos.split(", ");
    const guessAllPos = guessPos.split(", ");
    for (let i = 0; i < playerAllPos.length; i++) {
      for (let j = 0; j < guessAllPos.length; j++) {
        if (playerAllPos[i] == guessAllPos[j]) return styles.orangeCircle;
      }
    }
    return styles.redCircle;
  };

  const forceRefresh = () => {
    setRefreshTrigger(Date.now());
  };
  const renderCircles = (guess, playerIndex) => {
    const circles = [];
    if (guesses.length != 0 && playerToGuess) {
      const playerToGuessValues = [
        playerToGuess.nationality_name,
        playerToGuess.league_name,
        playerToGuess.club_name,
        playerToGuess.player_positions,
        playerToGuess.age.toString(),
      ];
      const playerValues = [
        guess.nationality_name,
        guess.league_name,
        guess.club_name,
        guess.player_positions,
        guess.age.toString(),
      ];
      if (guess.age > playerToGuess.age) {
        playerValues[4] += "↓";
      }
      if (guess.age < playerToGuess.age) {
        playerValues[4] += "↑";
      }
      for (let i = 0; i < playerToGuessValues.length; i++) {
        dynamicFontSize = Math.max(10, 20 - playerValues[i].length * 2);
        if (i == 3) {
          circles.push(
            <View
              key={i}
              style={[
                styles.circle,
                getCircleColor(playerToGuessValues[i], playerValues[i]),
              ]}
            >
              <Text style={[styles.circleText, { fontSize: dynamicFontSize }]}>
                {playerValues[i]}
              </Text>
            </View>
          );
        } else {
          circles.push(
            <View
              key={i}
              style={[
                styles.circle,
                playerToGuessValues[i] == playerValues[i]
                  ? styles.greenCircle
                  : styles.redCircle,
              ]}
            >
              <Text style={[styles.circleText, { fontSize: dynamicFontSize }]}>
                {playerValues[i]}
              </Text>
            </View>
          );
        }
      }
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Career Tracer : Level ${index}`}</Text>
      </View>

      <Text>The career of the player to found : </Text>
      <ScrollView>
        {playerCareer &&
          playerCareer.slice(0, progression).map((club, clubIndex) => (
            <View style={styles.club} key={clubIndex}>
              <Image
                style={styles.clubLogo}
                source={{
                  uri: `https://cdn.sofifa.net${club.logo}`,
                }}
              />
              <Text>
                {club.name} - {club.dates}{" "}
              </Text>
            </View>
          ))}
      </ScrollView>

      <Text>Your guesses : </Text>
      <ScrollView>
        {guesses
          .slice()
          .reverse()
          .map((guess, index) => (
            <View key={index} style={styles.guess}>
              <View style={styles.textAndCircleContainer}>
                <Text style={styles.textAboveCircle}>{guess.short_name}</Text>
                <View style={styles.circleContainer}>
                  {renderCircles(guess, guesses.length - 1 - index)}
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      <View style={styles.searchContainer}>
        <SearchPlayer
          visible={isModalVisible}
          onClose={toggleModal}
          forceRefresh={forceRefresh}
          guesses={guesses}
          level={`Career${index}`}
        />
      </View>
      {(guesses.length == 0 ||
        player != guesses[guesses.length - 1].player_id) && (
        <TouchableOpacity
          key={`searchButton-${index}`}
          style={styles.touchableOpacity}
          onPress={() => toggleModal()}
        >
          <Text>SEARCH</Text>
        </TouchableOpacity>
      )}
      {guesses.length != 0 &&
        player == guesses[guesses.length - 1].player_id && (
          <TouchableOpacity
            key={`finishButton-${index}`}
            style={styles.touchableOpacity}
            onPress={() => handlePress(index)}
          >
            <Text>FINISH</Text>
          </TouchableOpacity>
        )}
      <TouchableOpacity onPress={() => clear()}>
        <Text>CLEAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    padding: 10, // Add padding to the whole container
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 20, // Reduce top margin for title
  },
  title: {
    fontSize: 24, // Adjust title font size
    color: "white",
    marginBottom: 20,
  },
  club: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 60,
  },
  touchableOpacity: {
    backgroundColor: "#B3EFB2",
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
  },
  clubLogo: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  guess: {
    backgroundColor: "#B3EFB2",
    padding: 10,
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
  },
  circleText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  greenCircle: {
    backgroundColor: "green",
  },
  redCircle: {
    backgroundColor: "red",
  },
  orangeCircle: {
    backgroundColor: "orange",
  },
  textAndCircleContainer: {
    alignItems: "center",
  },
  textAboveCircle: {
    textAlign: "center",
    marginBottom: 5,
  },
});
