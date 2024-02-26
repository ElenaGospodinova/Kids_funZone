import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text, Image, Platform, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

import Screen from '../assets/components/Screen';
import colors from '../assets/config/colors';
import VideoCard from '../assets/components/VideoCard';

const MoviesScreen = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();
  
    const fetchMovies = async () => {
      const url = 'https://imdb146.p.rapidapi.com/v1/find/?query=brad%20kids%20movies';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '847b72ca63mshef857b9ae558dc0p1f3e08jsn3e246b4af59a',
          'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
  
        if (response.ok) {
          const result = await response.json();
          console.log(result);
  
          // Extract movie data from the response
          const movieResults = result.titleResults?.results || [];
          const movieData = movieResults.map(movie => ({
            id: movie.id,
            title: movie.titleNameText,
            image: movie.titlePosterImageModel?.url || 'https://example.com/fallback-image.jpg',
            streamingUrl:movie.streamingUrl || null// You can set streaming URL if available in the response
          }));
  
          setMovies(movieData);
          setLoading(false);
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchMovies();
    }, []);
  
    const handlePlayMovie = (streamingUrl) => {
      console.log('Playing movie with streaming URL:', streamingUrl);
      // Logic to play the movie using the streaming URL
    };
  
    const renderMovies = ({ item }) => (
        <View style={styles.movieList}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => handlePlayMovie(item.streamingUrl)}>
                <Image
                    source={{ uri: item.image}}
                    resizeMode='contain'
                    style={styles.moviesImg}
                />
                <Text>Play</Text>
            </TouchableOpacity>
        </View>
      );
      
  
    return (
      <View style={styles.container}>
        <View style={styles.fixedHeader}>
          <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Kids Zone')}>
            <Entypo name="video" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.music} onPress={() => navigation.navigate('Music Zone')}>
            <Entypo name="music" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Home')}>
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={movies}
          keyExtractor={item => item.id}
          renderItem={renderMovies}
          ListEmptyComponent={<ActivityIndicator size="large" color={colors.primary} />}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 17,
        marginBottom: 20,
    },
    back: {
        marginLeft: 10,
    },
    next: {
        marginRight: 1,
        position: 'absolute',
        top: Platform.OS === 'android' ? -1 : 3,
        right: 20,
        zIndex: 12,
        color: colors.white,
    },
    moviesContainer: {
        top: 124,
    },
    music: {
        position: 'absolute',
        top: 3,
        right: 60,
    },
    fixedHeader: {
        position: 'absolute',
        top: 40,
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
        width: 200,
        height: 100,
        marginHorizontal: 92,
    },
    movieList: {
        marginTop: 20,
    },
    moviesImg: {
        width: 100,
        height: 100,
    },
});

export default MoviesScreen;
