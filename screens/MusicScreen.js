import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import SearchBar from '../assets/components/SearchBar';
import LogInBtn from '../assets/components/LogInBtn';
import MusicCard from '../assets/components/MusicCard';

const CLIENT_ID = 'a829cad6b64344c88a2b7425a94e9f06';
const CLIENT_SECRET = '25ab471a807e411c82a140cfa83461ba';

const MusicScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [access_token, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const authParameters ={
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
      })
      .catch(error => console.error('Error fetching access token:', error));
  }, []);
  
  const search = async (input) => {
    console.log("Search for " + searchInput);

  
  //Get request using search to get Artist ID
  const searchParameters = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  };

  try {
    const artistIDResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters);

    if (artistIDResponse.ok) {
      const artistData = await artistIDResponse.json();
      const artistID = artistData.artists?.items[0]?.id;

      if (artistID) {
        console.log("Artist ID is: " + artistID);

        // Now that you have the artist ID, fetch all albums for that artist
        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, searchParameters);

        if (albumsResponse.ok) {
          const albumsData = await albumsResponse.json();
          const albums = albumsData.items;
          console.log("Artist Albums:", albums);
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
  // Get request with Artst ID grab all the albums from that artist

  const albumsResponse= async (artistID) => {

  try {
    const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, searchParameters);

    if (albumsResponse.ok) {
      const albumsData = await albumsResponse.json();
      // Handle the albumsData as needed
    } else {
      console.error('Failed to fetch artist albums', albumsResponse.status, albumsResponse.statusText);
    }
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

albumsResponse();


  //Display those albums to the user 




  return (
    <View style={styles.container}>
      <Text style={styles.header}>Music Playlist</Text>
      <SearchBar
          searchPhrase={searchInput}
          setSearchPhrase={setSearchInput}
          setClicked={setClicked}
          clicked={clicked}
          onKeyPress={(event) => {
            if (event.key == "Enter") {
              search(searchInput);
              setSearchInput('');
              setSearchPhrase('');
              console.log("Enter clicked");
            }
          }}
          onPress={(text) => {
           console.log('User Searched for: ',text);
           setSearchInput(text);
           //search;
           }}
      />        
          <LogInBtn 
            onPress={() => {
              console.log("Search Btn Clicked");
              setSearchPhrase('');
              search(searchInput);
            }}
            title="Search"
            style={styles.search}
          />
           
         
        {loading && <ActivityIndicator size="large" />}
        {error && <Text style={styles.errorText}>Error: {error}</Text>}

        <MusicCard
          source={{ uri: "https://source.unsplash.com/random" }}
          style={{ minHeight: 360 }}
        />
           <MusicCard
          source={{ uri: "https://source.unsplash.com/random" }}
          style={{ minHeight: 360 }}
        />
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
  search:{
    width:'22%',
    height:"5%",
    fontSize: 25,
    color:'red',
    backgroundColor:'green',
    left:323,
    bottom: 58,
    paddingLeft:1,
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
