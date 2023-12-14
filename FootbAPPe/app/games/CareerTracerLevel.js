import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SimpleStore from "react-native-simple-store";

export default function CareerTracerLevel() {
  const navigation = useNavigation();
  const route = useRoute();

  const index = route.params?.index + 1;
  const player = route.params?.text;

  const [playerCareer, setPlayerCareer] = useState(null);
  const [progression, setProgression] = useState(1);

  const handlePress = (level) => {
    SimpleStore.save("CareerTracerLevel", level)
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.log("Error saving data: ", error);
      });
    navigation.navigate("CareerTracer", { level: level - 1 });
  };

  const upgradeProgression = () => {
    SimpleStore.save(`CareerTracerLevel${index}Progression`, progression + 1)
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.log("Error saving data: ", error);
      });
    setProgression(progression + 1);
  }

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
      foundCareer.career.map((club) => {
        console.log(club.name, club.dates);
      });
      return foundCareer.career;
    } else {
      return "career not found";
    }
  };

  SimpleStore.get(`CareerTracerLevel${index}Progression`)
    .then((value) => {
      console.log("Retrieved data level: ", value);
      setProgression(value);
    })
    .catch((error) => {
      console.log("Error retrieving data: ", error);
    });

  useEffect(() => {
    setPlayerCareer(getplayerCareer());
  }, [route.params?.level]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Career Tracer : Level ${index}`}</Text>
      </View>
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
      <TouchableOpacity
        key={`nextButton-${index}`} // Unique key for next button
        style={styles.touchableOpacity}
        onPress={() => upgradeProgression()}
      >
        <Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={`finishButton-${index}`} // Unique key for finish button
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
    fontSize: 30,
    color: "white",
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
    height: 100,
  },
  clubLogo: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
});
