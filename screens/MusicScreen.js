import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  
} from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';


const token = 'a829cad6b64344c88a2b7425a94e9f06';

const MusicScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextTrackListUrl, setNextTrackListUrl] = useState(null);

  // Replace 'your_playlist_id' with the actual playlist ID you want to display
  const playlist_id = 'kids_playlist_id';
  const market = 'ES';

  const initialUrl = `https://api.spotify.com/v1/playlists/${playlist_id}?market=${market}&fields=items(added_by.id,track(name,href,album(name,href)))`;

  useEffect(() => {
    async function getTopKidsTracks() {
      return await fetchWebApi(initialUrl, 'GET');
    }

    const loadTracks = (url) => {
      setLoading(true);
      setError(null);

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setNextTrackListUrl(null); // Since playlists don't have a "next" endpoint

          const newTracks = data.items.map(({ track }) => ({
            id: track.href, // You can use track.href as the unique ID
            name: track.name,
            album: track.album.name,
            albumHref: track.album.href,
          }));

          setTracks(newTracks);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    loadTracks(initialUrl);
  }, []);

  const renderTrackItem = ({ item }) => {
    if (!item) {
      return null;
    }
    return (
      <View style={styles.trackItem}>
        <Text style={styles.trackName}>{item.name}</Text>
        <Text style={styles.albumName}>Album: {item.album}</Text>
        {/* Add a play button or action to play the track */}
      </View>
    );
  };

  const loadMoreTracks = () => {
    if (nextTrackListUrl) {
      loadTracks(nextTrackListUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kids' Music Playlist</Text>

      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {!loading && (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTrackItem}
          onEndReached={loadMoreTracks}
          onEndReachedThreshold={0.1}
        />
      )}

      {/* Add a WebView component to display the Spotify playlist */}
      <WebView
            source={{
                uri: `https://open.spotify.com/embed/playlist/${playlist_id}?utm_source=generator&theme=0`,
            }}
            style={{ minHeight: 360 }} // Set the height as needed
        />
    </View>
  );
}

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
  trackItem: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trackArtists: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default MusicScreen;
