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
import colors from '../assets/config/colors';
import SearchBar from '../assets/components/SearchBar';
import LogInBtn from '../assets/components/LogInBtn';

const CLIENT_ID = 'a829cad6b64344c88a2b7425a94e9f06';
const CLIENT_SECRET = '25ab471a807e411c82a140cfa83461ba';

const MusicScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [access_token, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [kidsSongs, setKidsSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [clicked, setClicked] = useState();

  const searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  };

  const fetchAccessToken = async () => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
      const data = await response.json();
      setAccessToken(data.access_token);
      fetchSongsList();
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const search = async () => {
    try {
      const artistIDResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        searchParameters,
        setSearchInitiated(true),
      );

      if (artistIDResponse.ok) {
        const artistData = await artistIDResponse.json();
        const artistID = artistData.artists?.items[0]?.id;

        if (artistID) {
          console.log('Artist ID is: ' + artistID);

          const albumsResponse = await fetch(
            `https://api.spotify.com/v1/artists/${artistID}/albums`,
            searchParameters
          );

          if (albumsResponse.ok) {
            const albumsData = await albumsResponse.json();
            const albums = albumsData.items;
            console.log('Artist Albums:', albums);

//And fetching images

            const tracksWithImages = await Promise.all(
              albums.map(async (album) => {
                const imagesResponse = await fetch(album.images[0].url);
                const imageData = await imagesResponse.blob();
                return {
                  ...album,
                  image: URL.createObjectURL(imageData),
                };
              })
            );

            setTracks(tracksWithImages);
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

  const playMusic = async (previewUrl) => {
    if (audio) {
      await audio.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri: previewUrl });
    setAudio(sound);
    await sound.playAsync();
  };

  const kidsList =
    'https://api.spotify.com/v1/search?q=kids%20songs&type=track&limit=15';

  const fetchSongsList = async () => {
    try {
      const kidsSongsResponse = await fetch(kidsList, searchParameters);

      if (kidsSongsResponse.ok) {
        const kidsData = await kidsSongsResponse.json();
        const kidsTracks = kidsData.tracks?.items || [];
        setKidsSongs(kidsTracks);
        console.log(kidsData);
      } else {
        console.error(
          'Failed to fetch kids songs',
          kidsSongsResponse.status,
          kidsSongsResponse.statusText
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderKidsSongs = () => {
    return (
      <FlatList
        data={kidsSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trackItem}
            onPress={() => playMusic(item.album.preview_url)}
          >
            <Image source={{ uri: item.albums.images.url }} style={styles.trackImage} />
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
  
  useEffect(() => {
    fetchSongsList(); 
  }, []);

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
            <Image source={{ uri: item.image }} style={styles.trackImage} />
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
                search(searchInput);
              }}
          />
          <LogInBtn
            title="Search"
            style={styles.search}
            onPress={() => {
              console.log('Search Btn Clicked');
              setSearchInput('');
              search(searchInput);
            }}
          />
          {loading && <ActivityIndicator size="large" />}
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {searchInitiated && (
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.trackItem}
                    onPress={() => playMusic(item.preview_url)}
                  >
                    <Image source={{ uri: item.image }} style={styles.trackImage} />
                    <View>
                      <Text style={styles.trackName}>{item.name}</Text>
                      <Text style={styles.trackArtists}>
                        {item.artists.map((artist) => artist.name).join(', ')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
           />
         )}
            <Text style={styles.header}>Your Music</Text>
            <FlatList
                data={kidsSongs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.songs}>
                    <Image source={{ uri: item.image }} style={styles.trackImage} />
                    <View>
                      <Text style={styles.trackName}>{item.name}</Text>
                      <Text style={styles.trackArtists}>
                        {item.artists.map((artist) => artist.name).join(', ')}
                      </Text>
                    </View>
                  </View>
                )}
            />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height:'100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    top: 12,
    color: 'white',
    left: 125,
  },
  songs:{
    top:24,
    padding:22,
    paddingBottom:2,
   
  },
  search: {
    width: '22%',
    height: '4%',
    fontSize: 15,
    backgroundColor: colors.lightGreen,
    left: 313,
    bottom: 9,
    paddingLeft: 2,
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
    height:23,
    width:50,
    
  },
  kidsSongsContainer: {
    backgroundColor:colors.green,
    height:"100%",
    top:23,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.darkBlue,
  },
  trackArtists: {
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default MusicScreen;
