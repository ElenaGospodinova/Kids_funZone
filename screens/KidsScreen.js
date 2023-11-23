import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Entypo } from '@expo/vector-icons';

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
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('Home'); 
    navigation.navigate('Parents Zone');
  };
  
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
        setError('No video items found');
        fetchLocalData();
      }
    } catch (error) {
      console.warn('Error fetching data from YouTube API:', error.message);
      fetchLocalData();
      setError('Failed to fetch data. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocalData = () => {
    try {
      const response = require('.././videoPlayer.json');
      const localData = response;

      if (localData.albums) {
        updateVideos(localData.albums);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
      setError('Failed to fetch data. Please check your json connection.');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchYouTubeData(), fetchLocalData()]);
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
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
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
      <FlatList
        data={videos}
        stickyHeaderIndices={[0]}
        keyExtractor={(item) => item.id.videoId || item.id}
        renderItem={renderVideoItem}
        ListHeaderComponent={
          <>
          <View style={styles.fixedHeader}>
            <TouchableOpacity style={styles.next} onPress={() => navigate('Parents Zone')}>
              <Entypo name="game-controller" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.back} title="Home"
                  onPress={() => navigate('Home')}>
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
           
            {clicked ? (
              <List searchPhrase={searchPhrase} data={filteredVideos} setClicked={setClicked} />
            ) : null}
          </>
        }
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
                  source={{ uri: `https://www.youtube.com/embed/${selectedVideo.id.videoId}` }}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 12,
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