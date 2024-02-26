import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const GamesScreen = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextGameListUrl, setNextGameListUrl] = useState(null);

  useEffect(() => {
    const APIKEY = 'YOUR_RAWG_API_KEY'; // Replace with your RAWG API key
    const initialUrl = `https://api.rawg.io/api/games?key=${APIKEY}&dates=2022-01-01,2022-12-31&ordering=-added`;

    const getPlatformStr = (platforms) => {
      const platformStr = platforms.map((pl) => pl.platform.name).join(', ');
      if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + '...';
      }
      return platformStr;
    };

    const loadGames = (url) => {
      setLoading(true);
      setError(null);

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setNextGameListUrl(data.next);

          const newGames = data.results.map((game) => ({
            id: game.id,
            name: game.name,
            backgroundImage: game.background_image,
            platforms: getPlatformStr(game.parent_platforms),
            rating: game.rating,
            released: game.released,
          }));

          setGames((prevGames) => [...prevGames, ...newGames]);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    loadGames(initialUrl);
  }, []);

  const renderGameItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.gameItem}
        onPress={() => console.log('Play game:', item.name)}
      >
        <Image source={{ uri: item.backgroundImage }} style={styles.gameImage} />
        <View style={styles.gameDetails}>
          <Text style={styles.gameName}>{item.name}</Text>
          <Text style={styles.platforms}>{item.platforms}</Text>
          <Text style={styles.rating}>Rating: {item.rating}</Text>
          <Text style={styles.released}>Released: {item.released}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadMoreGames = () => {
    if (nextGameListUrl) {
      loadGames(nextGameListUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Games</Text>

      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {!loading && (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGameItem}
          onEndReached={loadMoreGames}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  gameDetails: {
    flex: 1,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  platforms: {
    fontSize: 16,
    color: '#555',
  },
  rating: {
    fontSize: 16,
    color: '#555',
  },
  released: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default GamesScreen;


//AIzaSyCAgL3lpdSaICRlc9d3PWrCpjgeZV31qWw
//const API_KEY = '7b40ccf4a7e0409db82869c16777e458';