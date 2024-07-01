import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import * as ScreenOrientation from 'expo-screen-orientation';

import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';
import NavigationGames from '../assets/components/NavigationGames';
import HomeNavBtn from '../assets/components/HomeNavBtn';

const GamesScreen = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const changeScreenOrientation = async () => {
      if (selectedGame) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    };

    changeScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync(); // Reset to default orientation settings when component unmounts
    };
  }, [selectedGame]);

  const games = [
    { id: 'Poki Kids', image: require('../assets/img/gamesImg/Poki_Kids.png'), gameUrl: 'https://kids.poki.com' },
    { id: 'ABCYA', image: require('../assets/img/gamesImg/abcya.png'), gameUrl: 'https://www.abcya.com/' },
    { id: 'Splash Learn', image: require('../assets/img/gamesImg/SplashLearn.png'), gameUrl: 'https://www.splashlearn.com/games' },
    { id: 'CBeebies', image: require('../assets/img/gamesImg/CBeebies.png'), gameUrl: 'https://www.bbc.co.uk/cbeebies/games' },
    { id: 'Safe Kids Games', image: require('../assets/img/gamesImg/Safe_Kids_Games.png'), gameUrl: 'https://www.safekidgames.com/popular-games/' },
  ];

  const selectGame = (gameUrl) => {
    setSelectedGame(gameUrl);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  const renderGameItem = ({ item }) => (
    <Animatable.View animation="pulse" iterationCount={2} style={styles.gameItem}>
      <Text style={styles.gameName}>{item.id}</Text>
      <Image source={item.image} style={styles.gameImg} resizeMode='contain' />
      <LogInBtn
        style={styles.childBtn}
        onPress={() => selectGame(item.gameUrl)}
        title='Play'
      />
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationGames />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={renderGameItem}
      />
      {selectedGame && (
        <View style={styles.webViewContainer}>
          <TouchableOpacity onPress={closeGame} style={styles.closeButtonContainer}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <WebView source={{ uri: selectedGame }} style={styles.webView} />
        </View>
      )}
      <HomeNavBtn />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    marginTop: 33,
  },
  gameImg: {
    height: 160,
    width: 270,
  },
  gameItem: {
    margin: 30,
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: colors.cyanBlue,
  },
  gameName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
  childBtn: {
    marginTop: 12,
    backgroundColor: colors.green,
    width: 110,
    alignItems: 'center',
    padding: 10,
  },
  webViewContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'white',
  },
  webView: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: colors.red,
    borderRadius: 12,
    padding: 10,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GamesScreen;
