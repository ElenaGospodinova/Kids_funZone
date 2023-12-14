import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';

import colors from '../config/colors';
import localData from '../config/playlist';

export default function VideoCard({ onPress }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(localData.albums);
  const [selectedVideo, setSelectedVideo] = useState(selectedPlaylist[0]?.videos[0] || null);
  const [localDataLog, setLocalDataLog] = useState('');
  const videoRef = useRef(null);

  const handlePress = async () => {
    try {
      // Log local data
      const log = JSON.stringify(localData, null, 2);
      setLocalDataLog(log);
      console.log('Local Data:', localData);
      console.log('handle pressed');

      // Play video
      if (videoRef.current) {
        await videoRef.current.setStatusAsync({ shouldPlay: false });
        await videoRef.current.setPositionAsync(0); // Reset video to the beginning
        await videoRef.current.playAsync(); // Play the video
      }

      // Call the provided onPress function if available
      if (onPress) {
        onPress(localData);
      }
    } catch (error) {
      console.error('Error fetching local data:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        {selectedVideo ? (
          <Video
            ref={videoRef}
            source={{ uri: selectedVideo.url }}
            style={styles.video}
            resizeMode="cover"
            paused={true}
          />
        ) : null}
        <Image style={styles.photo} source={item.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          <Text style={styles.localDataLog}>{localDataLog}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={selectedPlaylist}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 2,
    paddingTop: 5,
    borderRadius: 15,
    marginTop: 16,
    height: 340,
    overflow: 'hidden',
  },
  photo: {
    width: '95%',
    left: 12,
    height: 200,
    borderRadius: 12,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  detailsContainer: {
    padding: 2,
    justifyContent: 'center',
    left: 10,
    bottom: 40,
    width: '90%',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    marginVertical: 6,
    top: 48,
  },
  subTitle: {
    color: colors.background,
    top: 50,
  },
  localDataLog: {
    color: colors.white,
    fontSize: 12,
    marginTop: 10,
  },
});
