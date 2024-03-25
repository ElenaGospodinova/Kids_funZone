import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,
          TouchableOpacity, 
          ActivityIndicator, 
          View, 
          Text,
          Image,
          Platform, 
          SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../assets/components/Screen';
import colors from '../assets/config/colors';




export default function PlayListScreen () {
  
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  
    const navigation = useNavigation();


  
  const fetchLocalData = () => {
    try {
      const localData = {
        "albums": [
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
      <View style={styles.container}>
      <View style={styles.fixedHeader}>
            <TouchableOpacity style={styles.next} title='Video'
                  onPress ={() => navigation.navigate('Kids Zone')}>
              <Entypo name="video" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
          style={styles.music}
          onPress={() => navigation.navigate('Music Zone')}
        >
          <Entypo name="music" size={24} color="black" />
        </TouchableOpacity>
            <TouchableOpacity style={styles.back} title='Home'
                  onPress ={() => navigation.navigate('Home')}>
              <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.movie}
              onPress={() => navigation.navigate('Movies Zone')}>
              <MaterialCommunityIcons name="movie-roll" size={24} color="black" />
            </TouchableOpacity>
            
      </View>
      {/* <View style={styles.movies}>
        <TouchableOpacity onPress={() => navigation.navigate('Movies Zone')}>
           <Text>Movies</Text>
           <Image 
              style={styles.moviesImg}
              source={require('../assets/img/pxfuel.jpg')} />
        </TouchableOpacity>
      </View> */}
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
    marginTop: 40,
   gap:142,
    
  },
  back: {
    marginLeft: 10,
  },
  next: {
    marginRight: 10,
    position: 'absolute',
    top: Platform.OS === 'android' ? -1 : 3,
    right: 20,
    zIndex: 12,
    color: colors.white,
  },
  back: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -1 : 3,
    left: 20,
    zIndex: 12,
    color:colors.white,
  },
  movies:{
    top:92,
    color:colors.white,
  },
  movie:{
    left:303,
    bottom:6,
  },
  music: {
    position: 'absolute',
    top: 3,
    right: 60,
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
    height: 220,
    padding:2,
    marginTop:25,
    
  },
  moviesImg:{
    height:252,
    width:'89%',
    left:17,
    borderRadius:12,
  },

});


