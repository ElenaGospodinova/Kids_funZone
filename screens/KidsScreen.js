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
import colors from '../assets/config/colors';
import VideoCard from '../assets/components/VideoCard';


import pic from '../assets/img/MoreVideos.png';
import MashaAndBear from '../assets/img/Masha_and_theBear.png';
import MrBean from '../assets/img/MrBean.png';
import GrizzyLemmings from '../assets/img/GrizzyThe_Lemmings.png';
import LittleSchool from '../assets/img/LittleSchool.png';
import OddbodsCartoons from '../assets/img/Oddbods_Cartoons.png';
import StrawberryShortCake from '../assets/img/StrawberryShortcake.png';
import NavigationKids from '../assets/components/NavigationKids';
import HomeNavBtn from '../assets/components/HomeNavBtn';

export default function KidsScreen() {
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

  const renderHeader = () => (
    <View>
      <View style={styles.listVideo}>
        <VideoCard
          style={styles.playlist}
          title="More Videos"
          image={pic}
          onPress={() => navigation.navigate('PlayList Zone')}
        />
      </View>
      <View style={styles.listVideo}>
        <VideoCard
          style={styles.playlist}
          title=" 👧 🐻 Masha and the Bear"
          image={MashaAndBear}
          resizeMode="contain-cover"
          onPress={() => navigation.navigate('Masha and the Bear ')}
        />
      </View>
      <View style={styles.listVideo}>
        <VideoCard
          style={styles.playlist}
          title="🎬 Mr Bean 🎬"
          image={MrBean}
          resizeMode="contain-cover"
          onPress={() => navigation.navigate('Mr Bean')}
        />
      </View>
      <View style={styles.listVideo}>
        <VideoCard
          style={styles.strawberry}
          title="🍓 Strawberry Shortcake 🍓"
          image={StrawberryShortCake}
          resizeMode="cover-contain"
          onPress={() => navigation.navigate('Strawberry Shortcake')}
        />
      </View>
      <View style={styles.listVideo}>
        <VideoCard
          style={styles.playlist}
          title="🐻🐹 Grizzy and Lemmings"
          image={GrizzyLemmings}
          resizeMode="cover"
          onPress={() => navigation.navigate('Grizzy and Lemmings')}
        />
      </View>
      <View style={styles.listVideo}>
        <VideoCard
          style={styles.playlist}
          title="🚀 Scientists' Lab 🚀"
          image={LittleSchool}
          resizeMode="contain-cover"
          onPress={() => navigation.navigate("Scientists' Lab")}
        />
      </View>
      <View style={styles.listVideoL}>
        <VideoCard
          style={styles.playlist}
          title="🏀 Oddbods Cartoons ⚽🎮"
          image={OddbodsCartoons}
          resizeMode="cover"
          onPress={() => navigation.navigate('Oddbods Cartoons')}
        />
      </View>
     
  </View>
  
    
  );

  return (
    <>
    <SafeAreaView style={styles.container}>
      {/* Include the NavigationBar component */}
      <NavigationKids />
    
  
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id.videoId.toString()}
        renderItem={renderVideoItem}
        ListHeaderComponent={renderHeader}
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
      <HomeNavBtn/>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom:1,
  },
  errorText: {
    color: colors.red,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 76 : 10,
  },

  playlist: {
    borderRadius: 12,
    width:'100%',
    top:12,
    bottom:33,
  },
  strawberry:{
    borderRadius: 12,
    width:'100%',
    aspectRatio: 1.8,
    overflow: 'hidden',
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
    //marginBottom:83,
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
    fontSize:16,
  },
  searchBar: {
    width: '90%',
    padding: 4,
  },
  searchText: {
    width: 100,
    height: '22%',
    backgroundColor: colors.lightGreen,
    left: 303,
    bottom: 53,
    paddingLeft: 10,
  },
 
 
});
