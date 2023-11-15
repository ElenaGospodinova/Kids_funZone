import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview';  // Import WebView

import SearchVideo from '../assets/components/SearchVideo';
import List from '../assets/components/ListFilter';
import colors from '../assets/config/colors';

export default function KidsScreen() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const fetchYouTubeData = async () => {
    const apiKey = 'AIzaSyCAgL3lpdSaICRlc9d3PWrCpjgeZV31qWw';
    const safeSearch = 'cocomelon-kids-videos-blippi-bbc-CBeebies'; // Replace with your desired search term

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${safeSearch}&type=video&key=${apiKey}`
      );

      if (!response.ok) {
        // If fetching from YouTube API fails, load data from local JSON file
        const localData = require('../videoPlayer.json');
        setVideos(localData);
        console.log('Loaded data from local JSON:', localData);
        throw new Error(`Failed to fetch data from YouTube API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
        console.log(data);
      } else {
        console.warn('No video items found in the response');
      }
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error.message);
      setError('Failed to fetch videos. Please try again later.');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchYouTubeData();
  }, []);

  const onVideoSelected = (video) => {
    setSelectedVideo(video);
  };

  const renderVideoItem = ({ item }) => {
    const thumbnailUrl = item.snippet.thumbnails?.medium?.url;

    if (!thumbnailUrl) {
      // Handle the case where the thumbnail is not available
      return null;
    }

    return (
      <TouchableOpacity onPress={() => onVideoSelected(item)}>
        <View style={styles.videoItem}>
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Text style={styles.titles}>{item.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!clicked && <Text style={styles.titles}></Text>}
         <SearchVideo
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
         />
         {clicked ? (
          <List searchPhrase={searchPhrase} data={videos} setClicked={setClicked} />
          ) : null}

      {loading ? (
        <ActivityIndicator size="large" color={colors.green} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id.videoId}
            renderItem={renderVideoItem}
          />
          {selectedVideo && (
            <View style={styles.videoContainer}>
              <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: `https://www.youtube.com/embed/${selectedVideo.id.videoId}` }}
                style={styles.video}
                onError={(syntheticEvent) => console.error('WebView error:', syntheticEvent.nativeEvent)}
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

KidsScreen.propTypes = {
  // Add your prop types here
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoItem: {
    margin: 20,
    right:10,
    padding:23,
    alignItems: 'center',
    borderRadius:8,
    width:'95%',
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    

  },
  thumbnail: {
    width: 200,
    height: 100,
    resizeMode: 'cover',
    borderRadius:12,
  },
  videoContainer: {
    padding:32,
    alignSelf: 'stretch',
    height: 300,
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    // Add any additional styling for the video container
  },
  video: {
    borderRadius:12,
    alignSelf: 'stretch',
    flex: 1,
    height: 300,
    // Add any additional styling for the video
  },
  errorText: {
    color: colors.red,
    fontSize:17,
    fontWeight:'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  titles:{
    padding:9,
    color:colors.darkBlue,
    fontWeight:'bold',
  }, 
  
});
