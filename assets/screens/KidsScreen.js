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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useQuery } from '@tanstack/react-query';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import SearchBar from '../components/SearchBar';
import LogInBtn from '../components/LogInBtn';
import colors from '../config/colors';
import VideoCard from '../components/VideoCard';
import pic from '../img/photo.jpeg';

export default function KidsScreen() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigation = useNavigation();

  const { isLoading, data, error } = useQuery({
    queryKey: ['video'],
    queryFn: async () => {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/search?q=cocomelon-kids-videos-blippi-CBeebies-marvel&part=snippet&maxResults=10&type=video&key=AIzaSyAc-mBPxmogOpFk26KPtFUp-vFKHfD_dDE'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.items;
    },
  });

  const filteredVideos = data || [];

  const renderVideoItem = ({ item }) => {
    const thumbnailUrl = item.snippet.thumbnails.medium.url;

    if (!thumbnailUrl) {
      console.warn('Thumbnail not available for:', item);
      return null;
    }

    const handlePress = () => {
      setSelectedVideo(item);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.videoItem}>
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} resizeMode="cover" />
          ) : (
            <ActivityIndicator size="small" color={colors.green} />
          )}
          <Text style={styles.titles}>{item.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Games Zone')}>
          <Entypo name="game-controller" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.music} onPress={() => navigation.navigate('Music Zone')}>
          <Entypo name="music" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Home')}>
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.user} onPress={() => navigation.navigate('Your List')}>
          <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.movie} onPress={() => navigation.navigate('Movies Zone')}>
          <MaterialCommunityIcons name="movie-roll" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {!clicked && <Text style={styles.titles}></Text>}
      <View style={styles.searchBar}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </View>
      <TouchableOpacity style={styles.searchBar} onPress={() => setClicked(true)}>
        <LogInBtn style={styles.searchText} title="Search" />
      </TouchableOpacity>
      <View style={styles.listVideo}>
        <VideoCard style={styles.playlist} title="More Videos" image={pic} />
      </View>
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id.videoId.toString()}
        renderItem={renderVideoItem}
      />
      {!clicked && null}
      {selectedVideo && (
        <View style={styles.videoContainer}>
          {selectedVideo && selectedVideo.id && selectedVideo.id.videoId ? (
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${selectedVideo.id.videoId}` }}
              style={styles.video}
            />
          ) : (
            <Video
              source={{ uri: selectedVideo.url }}
              style={styles.video}
              controls={true}
              resizeMode="cover"
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: colors.red,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 76 : 10,
  },
  next: {
    position: 'absolute',
    top: 3,
    right: 20,
    zIndex: 12,
  },
  back: {
    position: 'absolute',
    top: 3,
    left: 20,
    zIndex: 12,
  },
  music: {
    position: 'absolute',
    top: 3,
    right: 60,
  },
  movie:{
    right:83,
    bottom:4,
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  videoItem: {
    margin: 20,
    right: 10,
    padding: 23,
    alignItems: 'center',
    borderRadius: 8,
    width: '95%',
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
  },
  videoContainer: {
    padding: 32,
    alignSelf: 'stretch',
    height: 300,
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
  },
  video: {
    borderRadius: 12,
    alignSelf: 'stretch',
    flex: 1,
    height: 310,
  },
  thumbnail: {
    width: 250,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  titles: {
    padding: 9,
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  searchBar:{
    width:"90%",
    padding:4,
  },
  searchText:{
    width: 100,
    height: '22%',
    backgroundColor: colors.lightGreen,
    left: 303,
    bottom: 53,
    paddingLeft: 10,
  },
  movies:{
    color:'white',
    bottom:123,
  },
  user:{
    left:53,
    bottom:8,
  },
});