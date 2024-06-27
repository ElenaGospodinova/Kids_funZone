import React, { useState, useEffect } from 'react';
import { StyleSheet,  ActivityIndicator, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Screen from '../assets/components/Screen';
import GoBackBtn from '../assets/components/GoBackBtn';



export default function StrawberryShortCake() {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    
    
    const fetchLocalDataStrawberryS = () => {
      try {
        const localDataStrawberryS = {
          "albums": [
            {
              "id": "Strawberry Shortcake",
              "name": "Berry Bitty Adventures 🍓 On Ice",
              "url": "https://www.youtube.com/embed/7oo-Dn_gXVs" 
            },
            {
                "id": "Strawberry Shortcake",
                "name": "Checkmate ",
                "url": "https://www.youtube.com/embed/kvr0HoGula8" 
              },
              {
                "id": "Strawberry Shortcake",
                "name": "Birthday Memories",
                "url": "https://www.youtube.com/embed/qozZ7JnthGQ" 
              },
              {
                "id": "Strawberry Shortcake",
                "name": "How to play the game",
                "url": "https://www.youtube.com/embed/gaZ872X4Qgo" 
              },
              {
                "id": "Strawberry Shortcake",
                "name": "World record competition!",
                "url": "https://www.youtube.com/embed/xLebaQgXMfA" 
              },
              {
                "id": "Strawberry Shortcake",
                "name": "Berry in the Big City",
                "url": "https://www.youtube.com/embed/nPb9nWVzyWE" 
              },
              {
                "id": "Strawberry Shortcake",
                "name": "Pop Goes the Garden",
                "url": "https://www.youtube.com/embed/7MsslKoVwp0" 
              },
              {
                "id": "Strawberry Shortcake",
                "name": "The Berry Best Summer Vacation!",
                "url": "https://www.youtube.com/embed/RxRdUtqqdGk" 
              },
              {
                "id": "Strawberry Shortcake",
                "name": "The Berry Special Princess!",
                "url": "https://www.youtube.com/embed/LipfA0gksUQ" 
              }
          ]
        };
  
        if (localDataStrawberryS.albums) {
          setVideos(localDataStrawberryS.albums);
          setLoading(false);
        } else {
          console.warn('No video items found in the local response');
        }
      } catch (error) {
        console.error('Error fetching local data:', error.message);
      }
    };
  
    useEffect(() => {
      fetchLocalDataStrawberryS();
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
  