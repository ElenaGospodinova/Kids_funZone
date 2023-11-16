import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Platform } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import colors from "../config/colors";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked, updateVideos }) => {
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchYouTubeData = async () => {
      const apiKey = 'AIzaSyCAgL3lpdSaICRlc9d3PWrCpjgeZV31qWw';
      const safeSearch = 'cocomelon-kids-videos-blippi-bbc-CBeebies';

      try {
        setLoading(true);

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${safeSearch}&type=video&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data from YouTube API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.items) {
          updateVideos(data.items);
        } else {
          console.warn('No video items found in the response');
        }
      } catch (error) {
        console.error('Error fetching data from YouTube API:', error.message);
        // If API call fails, load data from local JSON file
        const localData = require('../../videoPlayer.json');
        updateVideos(localData.albums);
      } finally {
        setLoading(false);
      }
    };
     
    if (clicked && searchPhrase.trim() !== "") {
      fetchYouTubeData();
    }
  }, [clicked, searchPhrase, updateVideos]);

  return (
    <View style={styles.container}>
      <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
        <Feather name="search" size={20} color="black" style={{ marginLeft: 7 }} />

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />

        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1}}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>

      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}

      {loading && <ActivityIndicator size="small" color={colors.green} />}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 19,
    top:Platform.OS === 'android' ? 72 : -11,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  canx: {
    backgroundColor:colors.darkBlue,
    color: colors.white,
    
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding:Platform.OS === 'android' ? 12 : 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    color:colors.red,
  },
});
