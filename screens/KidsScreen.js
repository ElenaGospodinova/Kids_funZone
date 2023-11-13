import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import YouTube from 'react-native-youtube';
import VideoCard from '../assets/components/VideoCard';
import colors from '../assets/config/colors';

const KidsScreen = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchYouTubeData = async () => {
    const apiKey = 'AIzaSyCAgL3lpdSaICRlc9d3PWrCpjgeZV31qWw';
    const safeSearch = 'kids_videos'; // Replace with your desired search term

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${safeSearch}&type=video&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data from YouTube API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
        console.log(data);
      } else {
        console.warn('No video items found in the response');
      }
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error.message);
      setError('Failed to fetch videos. Please try again later.');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchYouTubeData();
  }, []);

  const onVideoSelected = (video) => {
    setSelectedVideo(video);
  };

  const renderVideoItem = ({ item }) => {
    const thumbnailUrl = item.snippet.thumbnails?.medium?.url;

    if (!thumbnailUrl) {
      // Handle the case where the thumbnail is not available
      return null;
    }

    return (
      <TouchableOpacity onPress={() => onVideoSelected(item)}>
        <View style={styles.videoItem}>
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Text>{item.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id.videoId}
            renderItem={renderVideoItem}
          />
          {selectedVideo && (
            <View style={styles.videoContainer}>
              <YouTube
                apiKey="AIzaSyCAgL3lpdSaICRlc9d3PWrCpjgeZV31qWw"
                videoId={selectedVideo.id.videoId}
                play={true}
                fullscreen={true}
                loop
                defaultQuality="hd1080" // Set the desired quality here
                onReady={(e) => console.log('onReady', e)}
                onChangeState={(e) => console.log('onChangeState', e)}
                onChangeQuality={(e) => console.log('onChangeQuality', e)}
                onError={(e) => console.log('onError', e)}
                style={styles.video}
              />
            </View>
          )}
          <View style={styles.videoCardContainer}>
            <VideoCard
              title="Vintage bicycle"
              subTitle="£24.00 each"
              image={require('../assets/img/d.png')}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoItem: {
    marginBottom: 16,
    alignItems: 'center',
  },
  thumbnail: {
    width: 120,
    height: 90,
    resizeMode: 'cover',
  },
  videoContainer: {
    alignSelf: 'stretch',
    height: 300,
    backgroundColor: colors.green,
    // Add any additional styling for the video container
  },
  video: {
    alignSelf: 'stretch',
    flex: 1,
    height: 300,
    // Add any additional styling for the video
  },
  videoCardContainer: {
    padding: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default KidsScreen;
