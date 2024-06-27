import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';


import colors from "../assets/config/colors";
import SearchBar from "../assets/components/SearchBar";
import LogInBtn from "../assets/components/LogInBtn";
import NavigationMusic from "../assets/components/NavigationMusic";

const CLIENT_ID = "a829cad6b64344c88a2b7425a94e9f06";
const CLIENT_SECRET = "25ab471a807e411c82a140cfa83461ba";

const MusicScreen = () => {

  const [searchInput, setSearchInput] = useState("");
  const [access_token, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [kidsSongs, setKidsSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [clicked, setClicked] = useState(false);

  const fetchAccessToken = async () => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
      const data = await response.json();
      setAccessToken(data.access_token);
      fetchSongsList(data.access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
      setError("Failed to fetch access token.");
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const search = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const tracksWithImages = data.tracks.items.filter(
          (track) => track.album.images.length > 0
        );
        setTracks(tracksWithImages);
      } else {
        console.error("Failed to fetch search results");
        setError("Failed to fetch search results");
      }
    } catch (error) {
      setError("Error occurred while fetching data");
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setSearchInitiated(true);
    }
  };

  const playMusic = async (trackUrl) => {
    if (!trackUrl) {
      setError("Track URL not available.");
      return;
    }
    try {
      if (audio) {
        await audio.unloadAsync();
      }
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: trackUrl },
        { shouldPlay: true }
      );
      setAudio(sound);
      setCurrentTrack(trackUrl);
      setTrackDuration(status.durationMillis);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        setCurrentPosition(status.positionMillis);
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Error playing track:", error);
      setError("Error playing track.");
    }
  };

  const stopMusic = async () => {
    if (audio) {
      await audio.stopAsync();
      setIsPlaying(false);
    }
  };

  const fetchSongsList = async (token) => {
    try {
      const kidsSongsResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent('kids songs')}&type=track`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (kidsSongsResponse.ok) {
        const kidsData = await kidsSongsResponse.json();
        const kidsTracks = kidsData.tracks.items.filter(
          (track) => track.album.images.length > 0
        );
        setKidsSongs(kidsTracks);
      } else {
        console.error(
          "Failed to fetch kids songs:",
          kidsSongsResponse.status,
          kidsSongsResponse.statusText
        );
        setError("Failed to fetch kids songs.");
      }
    } catch (error) {
      console.error("Error fetching kids songs:", error);
      setError("Error fetching kids songs.");
    } finally {
      setLoading(false);
    }
  };

  const openSpotify = (spotifyUri) => {
    const trackId = spotifyUri.split(':').pop();
    const url = `https://open.spotify.com/track/${trackId}`;
    console.log("Opening Spotify URL:", url); // Debug log
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
    <View style={styles.navBar}>
      <NavigationMusic/>
    </View>
      <View style={styles.searchBar}>
        <SearchBar
          searchPhrase={searchInput}
          setSearchPhrase={setSearchInput}
          setClicked={setClicked}
          clicked={clicked}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              search();
              console.log("Enter clicked");
            }
          }}
          onPress={(text) => {
            console.log("User Searched for: ", text);
          }}
        />
      </View>

      <LogInBtn
        title="Search"
        style={styles.search}
        onPress={() => {
          console.log("Search Btn Clicked");
          search();
        }}
      />
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {searchInitiated && (
        <FlatList
          style={styles.searchResult}
          data={tracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.trackContainer}>
              <TouchableOpacity
                style={[
                  styles.songs,
                  isPlaying && currentTrack === item.preview_url && styles.activeSong,
                ]}
                onPress={() =>
                  isPlaying && currentTrack === item.preview_url
                    ? stopMusic()
                    : playMusic(item.preview_url)
                }
              >
                <Image
                  source={{ uri: item.album.images[0].url }}
                  style={styles.trackImage}
                />
                <View style={styles.trackInfo}>
                  <Text style={styles.trackName}>{item.name}</Text>
                  <Text style={styles.trackArtists}>
                    {item.artists.map((artist) => artist.name).join(", ")}
                  </Text>
                </View>
                <View style={styles.controls}>
                  {isPlaying && currentTrack === item.preview_url ? (
                    <AntDesign name="pausecircleo" size={32} color="white" />
                  ) : (
                    <AntDesign name="playcircleo" size={32} color="white" />
                  )}
                  <TouchableOpacity
                    style={styles.spotifyButton}
                    onPress={() => openSpotify(item.uri)}
                  >
                    <FontAwesome name="spotify" size={32} color="green" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {isPlaying && currentTrack === item.preview_url && (
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={trackDuration}
                  value={currentPosition}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FFFFFF"
                  disabled
                />
              )}
            </View>
          )}
        />
      )}
     
      <FlatList
        data={kidsSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.trackContainer}>
            <TouchableOpacity
              style={[
                styles.songs,
                isPlaying && currentTrack === item.preview_url && styles.activeSong,
              ]}
              onPress={() =>
                isPlaying && currentTrack === item.preview_url
                  ? stopMusic()
                  : playMusic(item.preview_url)
              }
            >
              <Image
                source={{ uri: item.album.images[0].url }}
                style={styles.trackImage}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackName}>{item.name}</Text>
                <Text style={styles.trackArtists}>
                  {item.artists.map((artist) => artist.name).join(", ")}
                </Text>
              </View>
              <View style={styles.controls}>
                {isPlaying && currentTrack === item.preview_url ? (
                  <AntDesign name="pausecircleo" size={32} color="#6892d5" />
                ) : (
                  <AntDesign name="playcircleo" size={32} color="#6892d5" />
                )}
                <TouchableOpacity
                  style={styles.spotifyButton}
                  onPress={() => openSpotify(item.uri)}
                >
                  <FontAwesome name="spotify" size={36} color="#20CE5E" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {isPlaying && currentTrack === item.preview_url && (
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={trackDuration}
                value={currentPosition}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
                disabled
              />
            )}
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
    height: "100%",
    width:'100%',
  },
  navBar:{
    marginTop:152,
  },
  songs: {
    top: 51,
    padding: 17,
    height:'auto',
    width:'100%',
    paddingBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    width:'100%',
    backgroundColor: colors.veryLightBlue,
    borderRadius: 8,
  },
  searchBar: {
    top: 22,
    right: 12,
    width: "94%",
  },
  search: {
    width: 100,
    height: "4.8%",
    fontSize: 15,
    backgroundColor: colors.lightGreen,
    left: 290,
    bottom: 24,
    paddingLeft: 10,
  },
  searchResult: {
    marginTop: 22,
    height: "100%",
    width: "90%",
  },
  trackContainer: {
    marginBottom: 20,
  },
  trackImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkBlue,
  },
  trackArtists: {
    fontSize: 16,
    color: colors.lightBlue,
  },
  activeSong: {
    backgroundColor:colors.activeS,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    padding:2,
    gap:12,
    left:4,
    width:'auto',
    
  },
  slider: {
    width:'100%',
    height: 40,
    marginTop: 10,
  },
  spotifyButton: {
    marginLeft: 1,
  },
});

export default MusicScreen;
