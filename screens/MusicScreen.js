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


const CLIENT_ID = 'a829cad6b64344c88a2b7425a94e9f06';
const CLIENT_SECRET = '25ab471a807e411c82a140cfa83461ba';

const MusicScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [access_token, setAcccessToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextTrackListUrl, setNextTrackListUrl] = useState(null);

  // Replace 'your_playlist_id' with the actual playlist ID you want to display
  const playlist_id = 'kids_playlist_id';
  const market = 'ES';

  //const initialUrl = `https://api.spotify.com/v1/playlists/${playlist_id}?market=${market}&fields=items(added_by.id,track(name,href,album(name,href)))`;

  // useEffect(() => {
  //   const initialUrl = `https://accounts.spotify.com/api/token`;

  //   async function getTopKidsTracks() {
  //     return await fetchWebApi(initialUrl, 'GET');
  //   }

  //   const loadTracks = (url) => {
  //     setLoading(true);
  //     setError(null);

  //     axios
  //       .get(url, {
  //         headers: {
  //           Authorization: `Bearer ${CLIENT_ID}`,
  //         },
  //       })
  //       .then((response) => {
  //         const data = response.data;
  //         setNextTrackListUrl(null); // Since playlists don't have a "next" endpoint

  //         const newTracks = data.items.map(({ track }) => ({
  //           id: track.href, // You can use track.href as the unique ID
  //           name: track.name,
  //           album: track.album.name,
  //           albumHref: track.album.href,
  //         }));

  //         setTracks(newTracks);
  //       })
  //       .catch((error) => {
  //         setError(error.message);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  //   getTopKidsTracks(initialUrl);
  // }, []);
   
  useEffect(() => {
    const authParameters ={
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAcccessToken(data.access_token))
      .catch(error => console.error('Error fetching access token:', error));
  }, []);
  
  //search
  async function search(){
    console.log('Search for ' + searchInput)
  }


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

//Access Token: {"access_token":"BQBb-QQy3uy4s00O2SF5SY-Vd8_08AG6DjZBRoWnV5kXHGWHQq1KHs38kM70MK8ECqMiN_7Z4PUYskyfKnL0FsF0RTj1BEKfBSwsi1mbrCN-EnEZcN8","token_type":"Bearer","expires_in":3600}