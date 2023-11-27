import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

import Screen from '../assets/components/Screen';
import colors from '../assets/config/colors';
import KidsScreen from './KidsScreen';
import WelcomeScreen from './WelcomeScreen';


export default function GamesScreen () {
  
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  
  const navigation = useNavigation();

  const navigateToWelcomeScreen = () => {
    navigation.navigate({WelcomeScreen});
  };

  const navigateToKidsZone = () => {
    navigation.navigate({KidsScreen});
  };


  // const navigate = () => {
  //   navigation.navigate('Home'); 
  //   navigation.navigate('Kids Zone');
  // };
  
  
  
  const fetchLocalData = () => {
    try {
      const localData = {
        "albums": [
          {
            "id": "Cocomelon",
            "name": "Baby Shark",
            "url": "https://www.youtube.com/embed/020g-0hhCAU?list=RDEMqoGUgNWsf_NaVYG4SU5N8g"
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
            "id": "Tracktor Ted",
            "name": "Big Machines Compilation",
            "url": "https://www.youtube.com/embed/XQEt3Pfb-DM"
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
      <ActivityIndicator size='large' color="black" style={styles.loadingIndicator} />
    ) : (
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
            />
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.fixedHeader}>
            <TouchableOpacity style={styles.back}
                  onPress={navigateToWelcomeScreen}>
              <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>
             <TouchableOpacity style={styles.next}
                  onPress={navigateToKidsZone}>
              <Entypo name="video" size={24} color="black" />
            </TouchableOpacity>
          
          </View>
        }
      />
    )}
  </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 17,
    marginBottom: 20,
    
  },
  next: {
    marginRight: 10,
  },
  back: {
    marginLeft: 10,
  },
  next: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -1 : 3,
    right: 20,
    zIndex: 12,
    color:colors.white,
  },
  back: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -1 : 3,
    left: 20,
    zIndex: 12,
    color:colors.white,
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
    backgroundColor: colors.lightBlue,
  },
  loadingIndicator: {
    bottom: -305,
    width:200,
    height:100,
    marginHorizontal:92,
  },

  video: {
    borderRadius: 10,
    alignSelf: 'stretch',
    flex: 1,
    height: 230,
    padding:20,
    top:5,
    marginTop:55,
    
  },

});


