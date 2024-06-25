import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationBar from '../assets/components/NavigationBar';
import Screen from '../assets/components/Screen';
import GoBackBtn from '../assets/components/GoBackBtn';


export default function DrBinocsShow () {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  
  
  const fetchLocalDataDrBinocs = () => {
    try {
      const drBinocs = {
        "albums": [
          {
            "id": "Dr Binocs Show",
            "name": "What causes thunder and lightning?",
            "url": "https://www.youtube.com/embed/Lv6PGb_4deY" 
          },
          {
            "id": "Little School",
            "name": "What is volcano",
            "url": "https://www.youtube.com/embed/4xgy8D6Cew8" 
          },
          {
            "id": "Little School",
            "name": "What is Tornado",
            "url": "https://www.youtube.com/embed/wY3XwWIvFnI" 
          },
          {
            "id": "Little School",
            "name": "What is Desert",
            "url": "https://www.youtube.com/embed/lV6kuJYcJME" 
          },
          {
            "id": "Little School",
            "name": "What is Gravity",
            "url": "https://www.youtube.com/embed/G7ZAXgo442I" 
          },
          {
            "id": "Little School",
            "name": "How do Clouds form? Type of clouds ",
            "url": "https://www.youtube.com/embed/GIisXUPdjmI" 
          },
          {
            "id": "Little School",
            "name": "Oceans of the World",
            "url": "https://www.youtube.com/embed/1WZsxVDTqcU" 
          },
          {
            "id": "ittle School",
            "name": "Invention of Television ",
            "url": "https://www.youtube.com/embed/CsknE-vFsjs" 
          },
          {
            "id": "Little School",
            "name": "Magnets for Kids ",
            "url": "https://www.youtube.com/embed/7HHs98PBgk0" 
          },
          {
            "id": "Little School",
            "name": "Planets in the Solar System",
            "url": "https://www.youtube.com/embed/e8YzKyot4Pc" 
          },
          {
            "id": "Little School",
            "name": "Plate Tectonics",
            "url": "https://www.youtube.com/embed/bVn04eJRjV4" 
          },
          {
            "id": "Little School",
            "name": "Electricity",
            "url": "https://www.youtube.com/embed/Dx3RpXdJw2k" 
          },
          {
            "id": "Little School",
            "name": "EASY SCIENCE EXPERIMENTS TO DO AT HOME",
            "url": "https://www.youtube.com/embed/z-R3DShHbkA" 
          },
          {
            "id": "Little School",
            "name": "FUN EASY SCIENCE EXPERIMENTS FOR SCHOOL",
            "url": "https://www.youtube.com/embed/t957N-yhCoI" 
          },
        ]
      };

      if (drBinocs.albums) {
        setVideos(drBinocs.albums);
        setLoading(false);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
    }
  };

  useEffect(() => {
    fetchLocalDataDrBinocs();
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
      <GoBackBtn />
      {loading ? (
        <ActivityIndicator size='large' color="black" style={styles.loadingIndicator} />
      ) : (
        <View style={styles.container}>
          <FlatList
            style={styles.container}
            data={videos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.videoContainer} key={index}>
                <WebView
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: item.url }}
                  style={styles.video}
                  onError={(syntheticEvent) => console.error('WebView error:', syntheticEvent.nativeEvent)}
                  onLoadEnd={() => saveWatchedVideo(item)} // Save watched video on load end
                />
              </View>
            )}
          />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 7,
    gap: 142,
  },
  loadingIndicator: {
    bottom: -305,
    width: 200,
    height: 100,
    marginHorizontal: 92,
  },
  video: {
    borderRadius: 10,
    alignSelf: 'stretch',
    flex: 1,
    height: 220,
    padding: 2,
    marginTop: 25,
  },
  moviesImg: {
    height: 252,
    width: '89%',
    left: 17,
    borderRadius: 12,
  },
});
