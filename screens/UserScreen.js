import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SongsControler from '../assets/components/SongsControler';

export default function UserScreen() {
  const [watchedVideos, setWatchedVideos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchWatchedVideos();
  }, []);

  const fetchWatchedVideos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@watchedVideos');
      if (jsonValue !== null) {
        const videos = JSON.parse(jsonValue);
        setWatchedVideos(videos);
      }
    } catch (error) {
      console.error('Error fetching watched videos:', error);
    }
  };

  const renderVideoItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Your List', { video: item })}>
        <View style={styles.videoItem}>
          <Image source={{ uri: item.url }} style={styles.thumbnail} resizeMode="cover" />
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Kids Zone')}>
        <Entypo name="video" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.music} onPress={() => navigation.navigate('Music Zone')}>
        <Entypo name="music" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Home')}>
        <AntDesign name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.movie} onPress={() => navigation.navigate('Movies Zone')}>
        <MaterialCommunityIcons name="movie-roll" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Watched Videos</Text>
      <FlatList
        data={watchedVideos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderVideoItem}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next: {
    position: 'absolute',
    top: 83,
    right: 20,
    zIndex: 12,
  },
  music: {
    position: 'absolute',
    top: 83,
    right: 60,
  },
  movie: {
    left: 303,
    bottom: 6,
  },
  back: {
    position: 'absolute',
    top: 83,
    left: 20,
    zIndex: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  videoItem: {
    marginVertical: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 250,
    height: 130,
    borderRadius: 12,
  },
});
