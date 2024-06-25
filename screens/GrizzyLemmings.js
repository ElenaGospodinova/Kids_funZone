import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationBar from '../assets/components/NavigationBar';
import Screen from '../assets/components/Screen';
import GoBackBtn from '../assets/components/GoBackBtn';


export default function GrizzyAndLemmings () {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  
  
  const fetchLocalDataGrizzlyLem = () => {
    try {
      const grizzyLem = {
        "albums": [
          {
            "id": "Grizzy & The Lemmings",
            "name": "20 minutes of Grizzy & the Lemmings 🐻🐹",
            "url": "https://www.youtube.com/embed/bnMsvrRMYYM" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "Grizzy and the Lemmings in AFRICA!",
            "url": "https://www.youtube.com/embed/bBfeTkXEDXQ" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "Grizzy & The Lemmings",
            "url": "https://www.youtube.com/embed/tukC96k9OPA" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "Grizzy & Lemingy Best Series ",
            "url": "https://www.youtube.com/embed/0usxh1Osp0I" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "TOP special Magic Objects 🧙Halloween🎃",
            "url": "https://www.youtube.com/embed/e8tbEFB8nJs"
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "⚽ Compilation: Top Sport Competition 🐻🐹",
            "url": "https://www.youtube.com/embed/egZCiH3BPEE" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": " 🐻 Intensive Care",
            "url": "https://www.youtube.com/embed/MxaDJidGskc" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "🎩 Compilation",
            "url": "https://www.youtube.com/embed/pOo-6BCig5o" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "Grizzy & The Lemmings",
            "url": "https://www.youtube.com/embed/bf_FNSkxT7Q"
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "Grizzy & the Lemmings🐻",
            "url": "https://www.youtube.com/embed/VC_FN7QrGb4" 
          },
          {
            "id": "Grizzy & The Lemmings",
            "name": "Grizzy & The Lemmings",
            "url": "https://www.youtube.com/embed/irm1OnUvmNg?list=PLwIgXA-3vyMPUV3G45WCm0m2pyjJYfC4Z" 
          }
        ]
      };

      if (grizzyLem.albums) {
        setVideos(grizzyLem.albums);
        setLoading(false);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
    }
  };

  useEffect(() => {
    fetchLocalDataGrizzlyLem();
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
