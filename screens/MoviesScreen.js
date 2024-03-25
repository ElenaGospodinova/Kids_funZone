import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text, Image, Platform, ActivityIndicator, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

import Screen from '../assets/components/Screen';
import colors from '../assets/config/colors';
import VideoCard from '../assets/components/VideoCard';

const MoviesScreen = () => {
    const navigation = useNavigation();
  
//     const [loading, setLoading] = useState(true);
//     const [movies, setMovies] = useState([]);
   
    
//    const filterMovies = (movies) => {
//   // Assuming movies tagged with genre ID 16 are kids movies
//   return movies.filter(movie => movie.genre_ids.includes(16));
// };

//   const fetchMovies = async () => {
//     const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzZhNjU2MTg2ZTUwMmVmNTJiNWNiNWI5YjhjMGYyZiIsInN1YiI6IjY1Zjk4YmI2NGI5YmFlMDE4MzdmMDU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JaFUhFgqzQ_yOKWKtIk14GkzVi6zuaSN06SkILilSS0'
//       }
//     };
//     try {
//       const response = await fetch(url, options);

//       if (response.ok) {
//           const result = await response.json();
//           const movieResults = result.results || [];

//           const movieData = movieResults.map(movie => ({
//               id: movie.id.toString(),
//               title: movie.title,
//               image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://example.com/fallback-image.jpg',
//               streamingUrl: null, // can set streaming URL if available in the response
//               genre_ids: movie.genre_ids // assuming genre_ids are available in the response
//           }));
          
//           setMovies(movieData);
//           setLoading(false);
//       } else {
//           console.error('Failed to fetch data:', response.status, response.statusText);
//       }
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   }
// };

// useEffect(() => {
//   fetchMovies();
// }, []);

// const handlePlayMovie = (streamingUrl) => {
//   console.log('Playing movie with streaming URL:', streamingUrl);
//   // Logic to play the movie using the streaming URL
// };

// const renderMovies = ({ item }) => (
//   <View style={styles.movieContainer}>
//       <TouchableOpacity onPress={() => handlePlayMovie(item.streamingUrl)}>
//           <Image
//               source={{ uri: item.image }}
//               resizeMode="cover"
//               style={styles.movieImage}
//           />
//       </TouchableOpacity>
//       <Text style={styles.movieTitle}>{item.title}</Text>
//   </View>
// );

const { isLoading, data, error } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzZhNjU2MTg2ZTUwMmVmNTJiNWNiNWI5YjhjMGYyZiIsInN1YiI6IjY1Zjk4YmI2NGI5YmFlMDE4MzdmMDU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JaFUhFgqzQ_yOKWKtIk14GkzVi6zuaSN06SkILilSS0',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
            // Filter movies to include only those tagged as kids movies (genre ID 16)
            const kidsMovies = data.results.filter(movie => movie.genre_ids.includes(16));
            return kidsMovies;
    },
  });
  
  
  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />;
  }
  
  if (error) {
    console.error('Error fetching data:', error);
    return <Text>Error fetching data</Text>;
  }
  
  const movieData = data.map(movie => ({
    id: movie.id.toString(),
    title: movie.title,
    image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://example.com/fallback-image.jpg',
    streamingUrl: null, // can set streaming URL if available in the response
    genre_ids: movie.genre_ids // assuming genre_ids are available in the response
  }));


  const renderMovies = ({ item }) => (
    <View style={styles.movieContainer}>
        <TouchableOpacity onPress={() => handlePlayMovie(item.streamingUrl)}>
            <Image
                source={{ uri: item.image }}
                resizeMode="cover"
                style={styles.movieImage}
            />
        </TouchableOpacity>
        <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
);

const handlePlayMovie = (streamingUrl) => {
    console.log('Playing movie with streaming URL:', streamingUrl);
    // Logic to play the movie using the streaming URL
};

return (
    <SafeAreaView style={styles.background}>
    <View style={styles.container}>
        <View style={styles.fixedHeader}>
            <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Kids Zone')}>
                <Entypo name="video" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.music}
                onPress={() => navigation.navigate('Games Zone')}
            >
                <Entypo name="game-controller" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.music} onPress={() => navigation.navigate('Music Zone')}>
                <Entypo name="music" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Home')}>
                <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <FlatList
            data={movieData}
            keyExtractor={item => item.id}
            renderItem={renderMovies}
            contentContainerStyle={styles.moviesList}
        />
    </View>
</SafeAreaView>
);
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  container: {
      flex: 1,
      padding:20,
      
  },
  fixedHeader: {
      position: 'absolute',
      top: Platform.OS === 'android' ? 0 : 40,
      left: 0,
      right: 0,
      zIndex: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: colors.lightBlue,
  },
  next: {
      marginRight: 1,
  },
  music: {
      marginRight: 60,
  },
  back: {
      marginLeft: 10,
  },
  loadingIndicator: {
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
  },
  moviesList: {
      top:103,
      paddingVertical: 20,
      paddingHorizontal: 10,
  },
  movieContainer: {
      marginBottom: 20,
      alignItems: 'center',
  },
  movieImage: {
      width: '100%',
      aspectRatio: 16 / 9, 
  },
  movieTitle: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
  },
});

export default MoviesScreen;