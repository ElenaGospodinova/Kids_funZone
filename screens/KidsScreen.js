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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import { AntDesign, Entypo } from '@expo/vector-icons';

//import SearchVideo from '../assets/components/SearchVideo';
import colors from '../assets/config/colors';
import VideoCard from '../assets/components/VideoCard';
import pic from '../assets/img/photo.jpeg';
import SearchBar from '../assets/components/SearchVideo';


export default function KidsScreen() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [showVideoCard, setShowVideoCard] = useState(false); 
  // const [localData, setLocalData] = useState(null);

  const navigation = useNavigation();

  const API_KEY = 'AIzaSyAc-mBPxmogOpFk26KPtFUp-vFKHfD_dDE'; 
  const API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

  async function fetchYouTubeData(searchTerm) {
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: searchTerm,
          type: 'video',
          key: API_KEY,
        },
      });

      if (!response.data || !response.data.items) {
        console.warn('No video items found in the response');
        return [];
      }

      return response.data.items;
    } catch (error) {
      console.error('Error fetching YouTube data:', error.message);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchTerm = 'cocomelon-kids-videos-blippi-CBeebies-marvel'; 
        const fetchedVideos = await fetchYouTubeData(searchTerm);
        setVideos(fetchedVideos); // Set the videos
        setFilteredVideos(fetchedVideos); // Set filtered videos
        setShowVideoCard(true);
      } catch (error) {
        console.warn('Error fetching data:', error.message);
        setError('Please check your network connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchPhrase.trim() === '') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((item) =>
        item.snippet.title.toLowerCase().includes(searchPhrase.toLowerCase().trim())
      );
      setFilteredVideos(filtered);
    }
  }, [searchPhrase, videos]);

  const onVideoSelected = (selectedVideo) => {
    setSelectedVideo(selectedVideo);
  };

  const renderVideoItem = ({ item }) => {
    const thumbnailUrl = item.snippet.thumbnails.medium.url;

    if (!thumbnailUrl) {
      console.warn('Thumbnail not available for:', item);
      return null;
    }

    const handlePress = () => {
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
          onPress={() => navigation.navigate('Games Zone')}
        >
          <Entypo name="game-controller" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.music}
          onPress={() => navigation.navigate('Music Zone')}
        >
          <Entypo name="music" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('Home')}
        >
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity 
         style={styles.user}
          onPress={() => navigation.navigate('Your List')}>
        <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {!clicked && <Text style={styles.titles}></Text>}

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {showVideoCard && (
        <View style={styles.listVideo}>
          <VideoCard style={styles.playlist} title="More Videos" image={pic} />
        </View>
      )}

      {filteredVideos.length > 0 && (
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id.videoId.toString()}
          renderItem={renderVideoItem}
        />
      )}
      {!clicked && null}
      {loading ? (
        <ActivityIndicator size="large" color={colors.green} />
      ) : error ? (
        <>
          <PlayListScreen /> 
          {/* <MoviesScreen /> */}
        </>
       
      ) : videos.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : videos.length === 0 ? (
        <View style={styles.errorContainer}>

        {/* {* to add link to diferent screen when there are no video! *} */}

          <Text style={styles.errorText}>No videos to display</Text>
        </View>
      ) : (
        <>
          {selectedVideo && (
            <View style={styles.videoContainer}>
              {selectedVideo && selectedVideo.id && selectedVideo.id.videoId ? (
                <WebView
                  source={{ uri: `https://www.youtube.com/embed/${selectedVideo.id.videoId}` }}
                  style={styles.video}
                />
              ) : (
                <Video
                  source={{ uri: selectedVideo.url }}
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
  music: {
    position: 'absolute',
    top: 3,
    right: 60,
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
    width: 250,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  titles: {
    padding: 9,
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  movies:{
    color:'white',
    bottom:123,
  },
  user:{
    left:53,
    bottom:8,
  },
});