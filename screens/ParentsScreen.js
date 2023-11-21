import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';

import VideoCard from '../assets/components/VideoCard';
import Screen from '../assets/components/Screen';

const ParentsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const fetchLocalData = () => {
    try {
      const localData = {
        "albums": [
          {
            "id": "Cocomelon",
            "name": "Baby Shark",
            "url": "https://www.youtube.com/watch?v=020g-0hhCAU&list=RDEMqoGUgNWsf_NaVYG4SU5N8g&start_radio=1"
          },
          {
            "id": "Marvel",
            "name": "Spidey and Friends",
            "url": "https://www.youtube.com/watch?v=Vk36-GV81Yg"
          },
          {
            "id": "Gecko`s Garage",
            "name": "Gescko Basketball Bedlam",
            "url": "https://www.youtube.com/watch?v=fvcjuC027NU"
          }
        ]
      };

      setJsonData(localData);

      if (localData.albums) {
        updateVideos(localData.albums);
      } else {
        console.warn('No video items found in the local response');
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
      setError('Failed to fetch data. Please check your network connection.');
    }
  };

  useEffect(() => {
    fetchLocalData();
  }, []);

  const updateVideos = (newVideos) => {
    setVideos(newVideos);
    setLoading(false);
    
  };

    

  return (
<Screen>
      {loading ? (
        <ActivityIndicator size="large" color="black" style={styles.loadingIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={styles.next} onPress={() => navigateTo('Kids Zone')}>
            <AntDesign name="rightcircleo" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.back} onPress={() => navigateTo('Home')}>
            <AntDesign name="leftcircleo" size={24} color="black" />
          </TouchableOpacity>

          {/* Render video cards based on the fetched data */}
          <FlatList
            style={styles.item}
            data={videos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View  style={styles.videoContainer} key={index}>
                <VideoCard title={item.name} subTitle={item.id} url={item.url} />
                <WebView
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: item.url }}
                  style={styles.video}
                  onError={(syntheticEvent) => console.error('WebView error:', syntheticEvent.nativeEvent)}
                />
              </View>
            )}
          />
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 17,
    marginBottom: 10,
  },
  next: {
    position: 'absolute',
    top: -53,
    right: 20,
    zIndex: 12,
  },
  back: {
    position: 'absolute',
    top: -53,
    left: 20,
    zIndex: 12,
  },
  loadingIndicator: {
    bottom: 5,
  },

  video: {
    borderRadius: 22,
    alignSelf: 'stretch',
    flex: 1,
    height: 280,
    padding:20,
    margin:10,
    
  },

});

export default ParentsScreen;
