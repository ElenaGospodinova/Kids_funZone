import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YouTube from 'react-native-youtube-iframe';

import NavigationBar from '../assets/components/NavigationBar';
import Screen from '../assets/components/Screen';
import colors from '../assets/config/colors';
import GoBackBtn from '../assets/components/GoBackBtn';

export default function PlayListScreen() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);
 
  
  const { isLoading, data, error } = useQuery({
    queryKey: ['video'],
    queryFn: async () => {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/search?q=Disney+cartoon+animation+eposodes&part=snippet&maxResults=20&type=video&key=AIzaSyAc-mBPxmogOpFk26KPtFUp-vFKHfD_dDE'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.items;
    },
  });

  const filteredVideos = data || [];

  const renderVideoItem = ({ item }) => {
    const thumbnailUrl = item.snippet.thumbnails.medium.url;

    const handlePress = () => {
      setSelectedVideo(item);
      setIsBuffering(true);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.videoContainer}>
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} style={styles.video} resizeMode="contain" />
          ) : (
            <ActivityIndicator size="small" color={colors.green} />
          )}
          <Text style={styles.titles}>{item.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [localVideos, setLocalVideos] = useState([]);
  const fetchLocalData = () => {
    try {
      const localData = {
        "albums": [
          {
            "id": "Unicorn Academy ",
            "name": "Incredible Unicorn PLANT MAGIC!",
            "url": "https://www.youtube.com/embed/OV2xbYjO24g"
          },
          {
            "id": "Hudson's Playground",
            "name": "Play with the real tractors",
            "url": "https://www.youtube.com/embed/New-H4AFVE4"
          },
          {
            "id": "Marvel",
            "name": "Spidey and Friends",
            "url": "https://www.youtube.com/embed/Vk36-GV81Yg"
          },
          {
            "id": "Gecko`s Garage",
            "name": "Gescko Basketball Bedlam",
            "url": "https://www.youtube.com/embed/fvcjuC027NU"
          },
          {
            "id": "Unicorn Academy",
            "name": "Unicorn Academy",
            "url": "https://www.youtube.com/embed/g3Vv4kfHzKk"
          },
          {
            "id": "Tracktor Ted",
            "name": "Big Machines Compilation",
            "url": "https://www.youtube.com/embed/XQEt3Pfb-DM"
          },
          {
            "id": "Bluey",
            "name": "Season 3 Full Episodes",
            "url": "https://www.youtube.com/embed/MnFue5zu454"
          },
          {
            "id": "The Amazing World of Gumball",
            "name": "The Patato",
            "url": "https://www.youtube.com/embed/XxFvpUhmRak"
          }
        ]
      };

      if (localData.albums) {
        setLocalVideos(localData.albums);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
    }
  };

  useEffect(() => {
    fetchLocalData();
  }, []);

  const saveWatchedVideo = async (video) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@watchedVideos');
      let watchedVideos = jsonValue != null ? JSON.parse(jsonValue) : [];
      watchedVideos.push(video);
      await AsyncStorage.setItem('@watchedVideos', JSON.stringify(watchedVideos));
    } catch (error) {
      console.error('Error saving watched video:', error);
    }
  };

  return (
    <Screen>
      <GoBackBtn/>
      {isLoading ? (
        <ActivityIndicator size='large' color="black" style={styles.loadingIndicator} />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={localVideos.concat(filteredVideos)}
            keyExtractor={(item, index) => item.id?.videoId || item.url || index.toString()}
            renderItem={({ item }) => {
              if (item.snippet) {
                return renderVideoItem({ item });
              }
              return (
                <View style={styles.videoContainer}>
                  <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: item.url }}
                    style={styles.video}
                    onError={(syntheticEvent) => console.error('WebView error:', syntheticEvent.nativeEvent)}
                    onLoadEnd={() => saveWatchedVideo(item)}
                  />
                </View>
              );
            }}
          />
          {selectedVideo && (
            <View style={styles.videoContainer}>
              {isBuffering && (
                <ActivityIndicator size="large" color={colors.green} style={styles.bufferingIndicator} />
              )}
              <YouTube
               style={styles.video}
                videoId={selectedVideo.id.videoId}
                height={300}
                play={true}
                onReady={() => console.log('video is ready')}
                onChangeState={() => setIsBuffering(false)}
              />
            </View>
          )}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    marginTop: 40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    borderRadius: 10,
    alignSelf: 'stretch',
    height: 220,
    marginTop: 25,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius:12,
  },
  titles: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
    padding:12,
   
  },
  bufferingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -25,
    marginLeft: -25,
  },
});