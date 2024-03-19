import React, { useState } from 'react';
import { StyleSheet, 
          Text, 
          View, 
          FlatList, 
          Image, 
          TouchableOpacity, 
          SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';
import Adventure_Academy from '../assets/img/gamesImg/Adventure_Academy.png';
import ABCmouse from '../assets/img/gamesImg/ABCmouse.png';
import Poki_Kids from '../assets/img/gamesImg/Poki_Kids.png';
import KiZi from '../assets/img/gamesImg/KiZi.png';
import Adapted_Mind from '../assets/img/gamesImg/Adapted_Mind.png';
import Safe_Kids_Games from '../assets/img/gamesImg/Safe_Kids_Games.png';


const GamesScreen = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const navigation = useNavigation();

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
      gameUrl: 'https://kids.poki.com/',
    },
    {
      id: 'KiZi',
      image: KiZi,
      gameUrl: 'https://kizi.com/kids',
    },
    {
      id: 'Adapted Mind',
      image: Adapted_Mind,
      gameUrl: 'https://www.adaptedmind.com/Math-Worksheets.html?utm_medium=cpc&utm_source=microsoft&campaignid=603360158&campaign_type=search&placement=o&utm_content=responsivesearchad&adid=72293220966648&adset_id=1156688071131394&utm_term=online%20education%20games&device=c&msclkid=7e16184812031e24e1f27de7d686c926&utm_campaign=Search_Bing_NB_CAN_AUS_UK_Phrase',
    },
    {
      id: 'Adventure Academy',
      image: Adventure_Academy ,
      gameUrl:
        'https://www.adventureacademy.com/?src_tag=nonbrand::bing&utm_campaignid=272496824&utm_adgroupid=1227055165508530&utm_adextensionid=&utm_targetid=kwd-76691275688118:loc-188&utm_matchtype=p&utm_network=o&utm_device=c&utm_devicemodel=&utm_creativeid=&utm_placement=&utm_adposition=&utm_geo=US&msclkid=161ff60b039b15649cdf93a4832f1b89',
    },
    {
      id: 'ABC mouse',
      image: ABCmouse,
      gameUrl:
        'https://www.abcmouse.com/abc/?msclkid=c8499d3bc2001fac404af89441c4c295&utm_campaignid=470330525&utm_adgroupid=1235852068068298&utm_adextensionid=&utm_targetid=kwd-77241011563294&utm_matchtype=b&utm_network=o&utm_device=c&utm_devicemodel=&utm_creativeid=&utm_placement=&utm_adposition=&utm_geo=Canada&msclkid=c8499d3bc2001fac404af89441c4c295',
    },
    {
      id: 'Safe Kids Games',
      image: Safe_Kids_Games,
      gameUrl:'https://www.safekidgames.com/popular-games/',
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
    // Regular expression for a valid URL pattern
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };
  

  const closeGame = () => {
    setSelectedGame(null);
  };

  const renderGameItem = ({ item }) => {
    return (
      <Animatable.View 
       animation="pulse" // Choose your animation here
       iterationCount={2}
       style={styles.gameItem}>
        <Text style={styles.gameName}>{item.id}</Text>

        <Image 
            source={item.image}
            style ={styles.gameImg}
            resizeMode= 'contain'
             />
        <Animatable.View
        animation="pulse" // Choose your animation here
        iterationCount={8}
       
      >
            <LogInBtn 
                animation="pulse"
                iterationCount={18}
                style={styles.childBtn}
                onPress={() => selectGame(item.gameUrl)}
                title = 'Play'
            />
        </Animatable.View>
      </Animatable.View>
     
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    
        <View style={styles.container}>
          <Text style={styles.fixedHeader}>Games</Text>
          <TouchableOpacity
              style={styles.next}
              onPress={() => navigation.navigate('Kids Zone')}
            >
              <Entypo name="video" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.music}
              onPress={() => navigation.navigate('Music Zone')}
            >
              <Entypo name="music" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.navigate('Home')}
            >
              <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.movie}
              onPress={() => navigation.navigate('Movies Zone')}>
              <MaterialCommunityIcons name="movie-roll" size={24} color="black" />
            </TouchableOpacity>

          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={renderGameItem}
          />

          {selectedGame && (
            <View style={styles.webViewContainer}>
            {/* //make the component - clode btn  */}
              <Text style={styles.closeButton} onPress={closeGame}>
                Close
              </Text>
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
  },
  fixedHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop:33,
    left:154,
  },
  next: {
    position: 'absolute',
    top: 3,
    right: 20,
    zIndex: 12,
  },
  music:{
    position: 'absolute',
    top: 3,
    right:60,
  },
  movie:{
    left:283,
    bottom:87,
  },
  back: {
    position: 'absolute',
    top: 3,
    left: 20,
    zIndex: 12,
  },
  gameImg:{
    height: 160,
    width: 320,
   
  },
  gameItem: {
    margin: 20,
    right: 10,
    padding: 23,
    alignItems: 'center',
    borderRadius: 42,
    width: '90%',
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
  },
  gameName: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    color: colors.darkBlue,
  },
  childBtn: {
    margin:12,
    backgroundColor:colors.green,
    top:12,
    paddingRight:20,
    width:110,
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  closeButton: {
    position: 'absolute',
    top: 66,
    right: 16,
    zIndex: 1000,
    width:70,
    height:30,
    padding:7,
    color: 'blue',
    fontWeight:'bold',
    backgroundColor:'white',
  },
});

export default GamesScreen;
