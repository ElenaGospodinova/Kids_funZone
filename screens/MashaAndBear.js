import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Screen from '../assets/components/Screen';
import GoBackBtn from '../assets/components/GoBackBtn';


export default function MashaAndBear () {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  
  
  const fetchLocalDataMashaBear = () => {
    try {
      const mashaBear = {
        "albums": [
          {
            "id": "Masha and the Bear",
            "name": "🥔 Soup Pursuit 🥕🍲",
            "url": "https://www.youtube.com/embed/gEbbHlMXE9Y"
          },
          {
            "id": "Masha and the Bear",
            "name": "👱🏻‍♀️ Say Cheese 💐",
            "url": "https://www.youtube.com/embed/EZtyvPJ28EU" 
          },
          {
            "id": "Masha and the Bear ",
            "name": "🥋🤸 HOME-GROWN NINJAS 🤸🥋",
            "url": "https://www.youtube.com/embed/I6-ytXmTRlY" 
          },
          {
            "id": "Masha and the Bear",
            "name": "🐻‍❄️ The Mystery Guest 🫙🍓",
            "url": "https://www.youtube.com/embed/k36nVAvQyqc"
          },
          {
              "id": "Masha and the Bear",
              "name": "👗 Fun Dress-Ups 👒 ",
              "url": "https://www.youtube.com/embed/qOUdWnI7QLo"
          },
          {
            "id": "Masha and the Bear",
            "name": "👱‍♀️🏓 SPORT FOR LIFE! 🏅🤽‍♂️",
            "url": "https://www.youtube.com/embed/GW8I0q-xmIk"
        },
        {
            "id": "Masha and the Bear",
            "name": "Home Improvement 🏠",
            "url": "https://www.youtube.com/embed/lzDDCCQuuVA"
        },{
            "id": "Masha and the Bear",
            "name": "📦 Think Outside the Box 💡💭",
            "url": "https://www.youtube.com/embed/2PrnBcJy42o"
        },
        {
            "id": "Masha and the Bear",
            "name": " 🚀🌕Twinkle, twinkle, little star🌕🚀",
            "url": "https://www.youtube.com/embed/Exsljuc_hvs"
        },
        {
            "id": "Masha and the Bear",
            "name": "🐑 Rock-a-bye, baby! 🐑",
            "url": "https://www.youtube.com/embed/ljco-HIHIWM"
        }
        ]
      };

      if (mashaBear.albums) {
        setVideos(mashaBear.albums);
        setLoading(false);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
    }
  };

  useEffect(() => {
    fetchLocalDataMashaBear();
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
