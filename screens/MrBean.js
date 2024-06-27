import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import YouTube from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../assets/config/colors';
import GoBackBtn from '../assets/components/GoBackBtn';

const cacheKey = 'videoData';

export default function MrBean() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);
  

  const { isLoading, data, error } = useQuery({
    queryKey: ['video'],
    queryFn: async () => {
      try {
        const cachedData = await AsyncStorage.getItem(cacheKey);
        if (cachedData) {
          return JSON.parse(cachedData);
        }

        const response = await fetch(
          'https://www.googleapis.com/youtube/v3/search?q=MrBean+cartoon+animation+episodes&part=snippet&maxResults=10&type=video&key=AIzaSyCeTNZ8YHP8AkGDTQb3WHGewZim5CRlKPE'
        );

        if (!response.ok) {
          console.error('Network response was not ok', response.statusText);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data.items));
        console.log('Fetched data:', data);
        return data.items;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    },
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const filteredVideos = data || [];

  const renderVideoItem = ({ item }) => {
    const thumbnailUrl = item.snippet.thumbnails.medium.url;

    const handlePress = () => {
      setSelectedVideo(item);
      setIsBuffering(true);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.videoItem}>
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} resizeMode="contain" />
          ) : (
            <ActivityIndicator size="small" color={colors.green} />
          )}
          <Text style={styles.titles}>{item.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleStateChange = (state) => {
    console.log(state);
    if (state === 'buffering') {
      setIsBuffering(true);
    } else if (state === 'playing' || state === 'paused' || state === 'ended') {
      setIsBuffering(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoBackBtn />
      {isLoading && <ActivityIndicator size="large" color={colors.green} />}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id.videoId.toString()}
        renderItem={renderVideoItem}
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
            onChangeState={handleStateChange}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoItem: {
    margin: 20,
    padding: 23,
    right:7,
    alignItems: 'center',
    borderRadius: 8,
    width: '95%',
    backgroundColor:colors.cyanBlue,
  },
  videoContainer: {
    padding: 32,
    alignSelf: 'stretch',
    height: 300,
  },
  thumbnail: {
    width: "100%",
    height: 130,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  titles: {
    padding: 9,
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
});
