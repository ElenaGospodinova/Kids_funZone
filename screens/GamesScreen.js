import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

const API_KEY = '7b40ccf4a7e0409db82869c16777e458';

const getPlatformStr = (platforms) => {
  const platformStr = platforms.map((pl) => pl.platform.name).join(", ");
  if (platformStr.length > 30) {
    return platformStr.substring(0, 30) + "...";
  }
  return platformStr;
};

const GamesScreen = () => {
  const [games, setGames] = useState([]);
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [nextGameListUrl, setNextGameListUrl] = useState(null);

  useEffect(() => {
    const initialUrl = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-01-01,2023-12-31&ordering=-added`;

    // Load games without any filtering
    loadGames(initialUrl);
  }, []);

  const loadGames = async (url) => {
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
      console.error('An error occurred:', error);
    }
  };

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
        <Text style={styles.platforms}>{getPlatformStr(item.parent_platforms)}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.released}>Released: {item.released}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Games</Text>
      {selectedGameUrl ? (
        <View style={styles.webViewContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeWebView}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <WebView source={{ uri: selectedGameUrl }} />
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGameItem}
          onEndReached={() => {
            if (nextGameListUrl) {
              loadGames(nextGameListUrl);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    borderRadius: 18,
    marginVertical: 8,
  },
  gameImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 8,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  platforms: {
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    color: '#666',
    marginBottom: 8,
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
});

export default GamesScreen;
