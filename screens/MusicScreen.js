import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  
} from 'react-native';
import { Audio } from 'expo-av'; 


import SearchBar from '../assets/components/SearchBar';
import LogInBtn from '../assets/components/LogInBtn';
//import MusicCard from '../assets/components/MusicCard';

const CLIENT_ID = 'a829cad6b64344c88a2b7425a94e9f06';
const CLIENT_SECRET = '25ab471a807e411c82a140cfa83461ba';

const MusicScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [access_token, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [clicked, setClicked] = useState();

  // Get request using search to get Artist ID
  const searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  };

  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
      })
      .catch((error) => console.error('Error fetching access token:', error));
  }, []);

  const search = async (input) => {
    console.log('Search for ' + searchInput);

    try {
      const artistIDResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        searchParameters
      );

      if (artistIDResponse.ok) {
        const artistData = await artistIDResponse.json();
        const artistID = artistData.artists?.items[0]?.id;

        if (artistID) {
          console.log('Artist ID is: ' + artistID);

          // Now that you have the artist ID, fetch all albums for that artist
          const albumsResponse = await fetch(
            `https://api.spotify.com/v1/artists/${artistID}/albums`,
            searchParameters
          );

          if (albumsResponse.ok) {
            const albumsData = await albumsResponse.json();
            const albums = albumsData.items;
            console.log('Artist Albums:', albums);

            // Fetch images for each track
            const tracksWithImages = await Promise.all(
              albums.map(async (album) => {
                const imagesResponse = await fetch(
                  album.images[0].url
                );
                const imageData = await imagesResponse.blob();
                return {
                  ...album,
                  image: URL.createObjectURL(imageData),
                };
              })
            );

            setTracks(tracksWithImages); // Update the state with fetched albums and images
          } else {
            console.error('Failed to fetch artist albums');
          }
        } else {
          console.warn('No artist found for the search query.');
        }
      } else {
        console.error(
          'Failed to fetch artist',
          artistIDResponse.status,
          artistIDResponse.statusText
        );
      }
    } catch (error) {
      setError('Error occurred while fetching data');
      console.error('Error:', error);
    }
  };

  // Function to play music
  const playMusic = async (previewUrl) => {
    if (audio) {
      await audio.unloadAsync(); // Stop the current audio if playing
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri: previewUrl } // Use the track's preview URL
    );
    setAudio(sound);
    await sound.playAsync(); // Play the audio
  };


  
  const renderTracks = () => {
    return (
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trackItem}
            onPress={() => playMusic(item.preview_url)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.trackImage}
            />
            <View>
              <Text style={styles.trackName}>{item.name}</Text>
              <Text style={styles.trackArtists}>
                {item.artists.map((artist) => artist.name).join(', ')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
        <SearchBar
        style={styles.searchBar}
        searchPhrase={searchInput}
        setSearchPhrase={setSearchInput}
        setClicked={setClicked}
        clicked={clicked}
        onKeyPress={(event) => {
          if (event.key == 'Enter') {
            search(searchInput);
            setSearchInput('');
            setSearchPhrase('');
            console.log('Enter clicked');
          }
        }}
        onPress={(text) => {
          console.log('User Searched for: ', text);
          setSearchInput(text);
          //search;
        }}
      />
      
      <LogInBtn
        onPress={() => {
          console.log('Search Btn Clicked');
          setSearchPhrase('');
          search(searchInput);
        }}
        title="Search"
        style={styles.search}
      />
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {renderTracks()}
      <Text style={styles.header}>Your Music</Text>
      
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
    bottom: 726,
    color:'white',
    left:125,
  },
  search: {
    width: '22%',
    height: '5%',
    fontSize: 25,
    backgroundColor: 'green',
    left: 323,
    bottom: 13,
    paddingLeft: 1,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  trackImage: {
    width: 50,
    height: 50,
    marginRight: 10,
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
