import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';

import SearchVideo from '../assets/components/SearchVideo';
import List from '../assets/components/ListFilter';
import colors from '../assets/config/colors';
import data from '../videoPlayer.json';

export default function KidsScreen() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

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
        console.log(data);
      } else {
        console.warn('No video items found in the response');
        fetchLocalData();
      }
    } catch (error) {
      console.warn('Error fetching data from YouTube API:', error.message);
      // Fetch local data when YouTube API call fails
      fetchLocalData();
    } finally {
      setLoading(false);
    }
  };

const fetchLocalData = () => {
    try {
      // Adjust the path to your local JSON file based on your project structure
       const response =  require('.././videoPlayer.json');
       const data =  response;
  
      if (data.albums) {
        updateVideos(data.albums);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
      setError('Failed to fetch data. Please check your network connection.'); // Set a specific error message
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await fetchYouTubeData();
      fetchLocalData();
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (searchPhrase.trim() === '') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        (item) => item.snippet.title.toLowerCase().includes(searchPhrase.toLowerCase().trim())
      );
      setFilteredVideos(filtered);
    }
  }, [searchPhrase, videos]);

  const updateVideos = (newVideos) => {
    setVideos(newVideos);
    setFilteredVideos(newVideos);
  };

  const onVideoSelected = (video) => {
    setSelectedVideo(video);
  };

  const renderVideoItem = ({ item }) => {
    if (!item || !item.snippet || !item.snippet.title) {
      return null;
    }
    const thumbnailUrl = item.snippet?.thumbnails?.medium?.url;

    if (!thumbnailUrl) {
      console.warn('Thumbnail not available for:', item);
      return null;
    }
   
    const handlePress = () => {
      if (item.albumId && data.albums) {
        // Find the selected album
        const selectedAlbum = data.albums.find(album => album.id === item.albumId);
        console.log(album);
        if (selectedAlbum) {
          // Update the videos with the selected album's videos
          updateVideos(selectedAlbum.videos);
        }
      }
  
      // Handle other onPress logic if needed
      onVideoSelected(item);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
            <View style={styles.videoItem}>
              <Image
                source={{ uri: thumbnailUrl }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <Text style={styles.titles}>{item.snippet.title}</Text>
              {/* Displaying images from local JSON */}
              <Image
                source={{ uri: item.url }} // Assuming 'url' contains the path to the local image
                style={styles.thumbnail}
                resizeMode="cover"
              />
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
        updateVideos={updateVideos}
      />
      {clicked ? (
        <List searchPhrase={searchPhrase} data={filteredVideos} setClicked={setClicked} />
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" color={colors.green} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id.videoId || item.id}
            renderItem={renderVideoItem}
          />
          {selectedVideo && (
            <View style={styles.videoContainer}>
              {selectedVideo.id.videoId ? (
                <WebView
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: `https://www.youtube.com/embed/${selectedVideo.id.videoId}` }}
                  style={styles.video}
                  onError={(syntheticEvent) => console.error('WebView error:', syntheticEvent.nativeEvent)}
                />
              ) : (
                <Video
                  source={{ uri: selectedVideo.url }} // assuming url is an array
                  style={styles.video}
                  controls={true}
                  resizeMode="cover"
                />
              )}
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

KidsScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: colors.red,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 76 : 10,
  },
  videoItem: {
    margin: 20,
    right: 10,
    padding: 23,
    alignItems: 'center',
    borderRadius: 8,
    width: '95%',
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
  },
  videoContainer: {
    padding: 32,
    alignSelf: 'stretch',
    height: 300,
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
  },
  video: {
    borderRadius: 12,
    alignSelf: 'stretch',
    flex: 1,
    height: 300,
  },
  thumbnail: {
    width: 200,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  titles: {
    padding: 9,
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 10,
    color: colors.red,
  },
});
