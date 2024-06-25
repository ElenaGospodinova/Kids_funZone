import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationBar from '../assets/components/NavigationBar';
import Screen from '../assets/components/Screen';
import GoBackBtn from '../assets/components/GoBackBtn';

export default function OddbodsCartoons () {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  
  const fetchLocalDataOddbods = () => {
    try {
      const localDataOddbods = {
        "albums": [
        {
            "id": "Oddbods",
            "name": "Non-stop Funny Cartoons",
            "url": "https://www.youtube.com/embed/UjldiOzJrN4" 
        },
          {
            "id": "Oddbods",
            "name": "Monster Truck Trouble",
            "url": "https://www.youtube.com/embed/wO79U0hqqJI" 
          },
          {
            "id": "Oddbods",
            "name": "Pizza",
            "url": "https://www.youtube.com/embed/oNDEUpVjwI8" 
          },
          {
            "id": "Oddbods",
            "name": "Baby Oddbods Go Fishing for the First Time! 🐟",
            "url": "https://www.youtube.com/embed/Sp09I0pi_OM" 
          },
          {
            "id": "Oddbods",
            "name": "Oddbods Giant Statue of Slickety",
            "url": "https://www.youtube.com/embed/ADtnTkZNfpw" 
          },
          {
            "id": "Oddbods",
            "name": "24/7 Fun and Adventure Cartoons",
            "url": "https://www.youtube.com/embed/8OFriai-GpQ" 
          },
          {
            "id": "Oddbods",
            "name": "Ghostbusters ",
            "url": "https://www.youtube.com/embed/PbvRoGnftwY" 
          },
          {
            "id": "Oddbods",
            "name": "Birds in Space",
            "url": "https://www.youtube.com/embed/JYizbe9BaLo" 
          },
          {
            "id": "Oddbods",
            "name": "Oddbods Stuck In The Wild",
            "url": "https://www.youtube.com/embed/CuFOKSzPOUc" 
          },
        ]
      };

      if (localDataOddbods.albums) {
        setVideos(localDataOddbods.albums);
        setLoading(false);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
    }
  };

  useEffect(() => {
    fetchLocalDataOddbods();
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
