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
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import { AntDesign, Entypo } from '@expo/vector-icons';

import SearchVideo from '../assets/components/SearchVideo';
import List from '../assets/components/ListFilter';
import colors from '../assets/config/colors';
import data from '../videoPlayer.json';

const API_KEY = 'AIzaSyCAgL3lpdSaICRlc9d3PWrCpjgeZV31qWw'; // Load your API key from an environment variable

export default function KidsScreen() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [localData, setLocalData] = useState(null);

  const navigation = useNavigation();

  const fetchYouTubeData = async () => {
    try {
      setLoading(true);
      const searchTerm = 'cocomelon-kids-videos-blippi-bbc-CBeebies'; 
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}&type=video&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data from YouTube API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        updateVideos(data.items);
      } else {
        console.warn('No video items found in the response');
        setError('No video items found');
        await fetchLocalData();
      }
    } catch (error) {
      console.error('Error fetching YouTube data:', error.message);
      setError('Failed to fetch YouTube data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocalData = async () => {
    try {
      const response = require('../videoPlayer.json');

      if (response.albums) {
        updateVideos(response.albums);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
      setError('Failed to fetch data. Please check your JSON connection.');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [youtubeData, localData] = await Promise.all([
        fetchYouTubeData(),
        fetchLocalData(),
      ]);

      if (youtubeData && !youtubeData.error) {
        updateVideos(youtubeData.items);
      } else {
        console.warn('No video items found in the YouTube response');
        setError('No video items found');
      }

      if (localData && localData.albums) {
        updateVideos(localData.albums);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.warn('Error fetching data:', error.message);
      setError('Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchPhrase.trim() === '') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((item) =>
        item.snippet.title.toLowerCase().includes(searchPhrase.toLowerCase().trim()) ||
        (item.albums &&
          item.albums.some((album) =>
            album.videos.some((video) =>
              video.snippet.title.toLowerCase().includes(searchPhrase.toLowerCase().trim())
            )
          ))
      );
      setFilteredVideos(filtered);
    }
  }, [searchPhrase, videos]);

  const updateVideos = (newVideos) => {
    setVideos(newVideos);
    setFilteredVideos(newVideos);
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
        const selectedAlbum = data.albums.find((album) => album.id === item.albumId);
        if (selectedAlbum) {
          updateVideos(selectedAlbum.videos);
        }
      }

      onVideoSelected(item);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.videoItem}>
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} resizeMode="cover" />
          ) : (
            <ActivityIndicator size="small" color={colors.green} />
          )}
          <Text style={styles.titles}>{item.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity
          style={styles.next}
          title="Games Zone"
          onPress={() => navigation.navigate('Games Zone')}
        >
          <Entypo name="game-controller" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          title="Home"
          onPress={() => navigation.navigate('Home')}
        >
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {!clicked && <Text style={styles.titles}></Text>}

      <SearchVideo
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        updateVideos={updateVideos}
      />

      {clicked ? <List searchPhrase={searchPhrase} data={filteredVideos} setClicked={setClicked} /> : null}

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId || item.id}
        renderItem={renderVideoItem}
      />

      {loading ? (
        
        <ActivityIndicator size="large" color={colors.green} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : videos.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No videos to display</Text>
        </View>
      ) : (
        <>
          {selectedVideo && (
            <View style={styles.videoContainer}>
              {selectedVideo.id.videoId ? (
                <WebView
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{
                    uri: `https://www.youtube.com/embed/${selectedVideo.id.videoId}`,
                  }}
                  style={styles.video}
                  onError={(syntheticEvent) =>
                    console.error('WebView error:', syntheticEvent.nativeEvent)
                  }
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
  next: {
    position: 'absolute',
    top: 3,
    right: 20,
    zIndex: 12,
  },
  back: {
    position: 'absolute',
    top: 3,
    left: 20,
    zIndex: 12,
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
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
    height: 310,
  },
  thumbnail: {
    width: 230,
    height: 130,
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
