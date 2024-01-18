import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  WebView,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';

const API_KEY = '7b40ccf4a7e0409db82869c16777e458';
const KID_KEYWORDS = ['kids', 'children', 'family'];

const GamesScreen = () => {
  const [games, setGames] = useState([]);
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [nextGameListUrl, setNextGameListUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const initialUrl = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&genres=${KID_KEYWORDS.join()}`;

    const fetchGames = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API Request Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const newGames = data.results;
        const newNextGameListUrl = data.next;

        setNextGameListUrl(newNextGameListUrl);
        setGames((prevGames) => [...prevGames, ...newGames]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames(initialUrl);
  }, []);

  const viewGame = (url) => {
    setSelectedGameUrl(url);
  };

  const closeWebView = () => {
    setSelectedGameUrl(null);
  };

  const renderGameItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.gameItem} onPress={() => viewGame(item.website)}>
        <Image source={{ uri: item.background_image }} style={styles.gameImage} />
        <Text style={styles.gameName}>{item.name}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>

        <LogInBtn
          onPress={() => viewGame(item.website)}
          title="Play"
          style={styles.childBtn}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity style={styles.next} title='Video' onPress={() => navigation.navigate('Kids Zone')}>
          <Entypo name="video" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.back} title='Home' onPress={() => navigation.navigate('Home')}>
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Games</Text>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {!loading && !error && (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGameItem}
          // Pagination handling here
        />
      )}

      {selectedGameUrl ? (
        <View style={styles.webViewContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeWebView}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <WebView source={{ uri: selectedGameUrl }} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
  fixedHeader: {
    position: 'absolute',
    top: 60,
    left: 2,
    right: 0,
    zIndex: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.lightBlue,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    top: 83,
    left: 120,
  },
  next: {
    marginRight: 10,
    position: 'absolute',
    top: Platform.OS === 'android' ? -1 : 4,
    right: 18,
    zIndex: 12,
    color: colors.white,
  },
  back: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -1 : 3,
    left: 20,
    zIndex: 12,
    color:colors.white,
  },
  gameItem: {
    padding: 16,
    top: 120,
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    borderRadius: 18,
    marginVertical: 8,
  },
  gameImage: {
    width: 250,
    height: 180,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 8,
    left: 22,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    left: 57, 
    color: '#333',
  },
  childBtn:{
    width:100,
    height:50,
    flexDirection:'column',
    borderRadius:12,
    padding:2,
    margin:9,
    backgroundColor: '#65B741',
    zIndex:32,
    color:'white',
    left:50,
    
  },
  platforms: {
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    color: '#666',
    marginBottom: 8,
    left:57,
  },
  released: {
    color: '#666',
    marginBottom: 8,
  },
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
  },
  next: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  back: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});

export default GamesScreen;
