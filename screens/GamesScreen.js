import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';

import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';
import Poki_Kids from '../assets/img/gamesImg/Poki_Kids.png';
import Safe_Kids_Games from '../assets/img/gamesImg/Safe_Kids_Games.png';
import CBeebies from '../assets/img/gamesImg/CBeebies.png';
import SplashLearn from '../assets/img/gamesImg/SplashLearn.png';
import ABCYA from '../assets/img/gamesImg/abcya.png';
import NavigationScreen from '../assets/components/NavigationScreen';

const GamesScreen = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const playGame = async (url) => {
    if (url && typeof url === 'string' && url.trim() !== '') {
      setSelectedGame(url);
    } else {
      console.error('Invalid URL:', url);
    }
  };

  const games = [
    {
      id: 'Poki Kids',
      image: Poki_Kids,
      gameUrl: 'https://kids.poki.com',
    },
    {
      id: 'ABCYA',
      image: ABCYA,
      gameUrl: 'https://www.abcya.com/',
    },
    {
      id: 'Splash Learn',
      image: SplashLearn,
      gameUrl: 'https://www.splashlearn.com/games'
    },
    {
      id: 'CBeebies',
      image: CBeebies,
      gameUrl: 'https://www.bbc.co.uk/cbeebies/games'
    },
    {
      id: 'Safe Kids Games',
      image: Safe_Kids_Games,
      gameUrl: 'https://www.safekidgames.com/popular-games/',
    }
  ];

  const selectGame = (gameUrl) => {
    if (isValidURL(gameUrl)) {
      setSelectedGame(gameUrl);
    } else {
      console.error('Invalid URL:', gameUrl);
    }
  };

  const isValidURL = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  const renderGameItem = ({ item }) => {
    return (
      <Animatable.View animation="pulse" iterationCount={2} style={styles.gameItem}>
        <Text style={styles.gameName}>{item.id}</Text>
        <Image source={item.image} style={styles.gameImg} resizeMode='contain' />
        <Animatable.View animation="pulse" iterationCount={8}>
          <LogInBtn
            animation="pulse"
            iterationCount={18}
            style={styles.childBtn}
            onPress={() => selectGame(item.gameUrl)}
            title='Play'
          />
        </Animatable.View>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
       <NavigationScreen />
       
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={renderGameItem}
          
        />

        {selectedGame && (
          <View style={styles.webViewContainer}>
            <TouchableOpacity onPress={closeGame} style={styles.closeButtonContainer}>
              <Text style={styles.closeButtonText}>
                Close
              </Text>
            </TouchableOpacity>
            <WebView source={{ uri: selectedGame }} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:33,
  },
  fixedHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 33,
    left: 154,
  },
  gameImg: {
    height: 160,
    width: 270,
  },
  gameItem: {
    margin: 20,
    right: 10,
    padding: 23,
    alignItems: 'center',
    borderRadius: 42,
    width: '90%',
    backgroundColor: colors.cyanBlue,
  },
  gameName: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    color: colors.darkBlue,
  },
  childBtn: {
    margin: 12,
    backgroundColor: colors.green,
    top: 12,
    paddingRight: 20,
    width: 110,
  },
  webViewContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 66,
    right: 16,
    zIndex: 1000,
    backgroundColor: colors.red,
    borderRadius: 12,
    padding: 7,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    fontSize: 16,
  },
});

export default GamesScreen;
