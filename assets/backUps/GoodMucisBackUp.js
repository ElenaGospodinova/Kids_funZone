
// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { Audio } from 'expo-av';
// import { useNavigation } from '@react-navigation/native';
// import { AntDesign, Entypo } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// import colors from '../assets/config/colors';
// import SearchBar from '../assets/components/SearchBar';
// import LogInBtn from '../assets/components/LogInBtn';

// const CLIENT_ID = 'a829cad6b64344c88a2b7425a94e9f06';
// const CLIENT_SECRET = '25ab471a807e411c82a140cfa83461ba';

// const MusicScreen = () => {
//   const navigation = useNavigation();

//   const [searchInput, setSearchInput] = useState('');
//   const [access_token, setAccessToken] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [tracks, setTracks] = useState([]);
//   const [searchInitiated, setSearchInitiated] = useState(false);
//   const [kidsSongs, setKidsSongs] = useState([]);
//   const [audio, setAudio] = useState(null);
//   const [clicked, setClicked] = useState(false);

//   const searchParameters = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + access_token,
//     },
//   };

//   const fetchAccessToken = async () => {
//     const authParameters = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
//     };

//     try {
//       const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
//       const data = await response.json();
//       setAccessToken(data.access_token);
//       fetchSongsList();
//     } catch (error) {
//       console.error('Error fetching access token:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAccessToken();
//   }, []);

//   const search = async () => {
//     setLoading(true);
//     try {
//       const artistIDResponse = await fetch(
//         `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
//         searchParameters,
//        setSearchInitiated(true),
//       );

//       if (artistIDResponse.ok) {
//         const artistData = await artistIDResponse.json();
//         const artistID = artistData.artists?.items[0]?.id;

//         if (artistID) {
//           console.log('Artist ID is: ' + artistID);

//           const albumsResponse = await fetch(
//             `https://api.spotify.com/v1/artists/${artistID}/albums`,
//             searchParameters
//           );

//           if (albumsResponse.ok) {
//             const albumsData = await albumsResponse.json();
//             const albums = albumsData.items;
//             console.log('Artist Albums:', albums);

          
  
//           //And fetching images

//             const tracksWithImages = await Promise.all(
//               albums.map(async (album) => {
//                 const imagesResponse = await fetch(album.images[0].url);
//                 const imageData = await imagesResponse.blob();
//                 return {
//                   ...album,
//                   image: URL.createObjectURL(imageData),
//                 };
//               })
//             );

//             setTracks(tracksWithImages);
//            setLoading(false); 
//           } else {
//             console.error('Failed to fetch artist albums');
           
//           }
//         } else {
//           console.warn('No artist found for the search query.');
       
//         }
//       } else {
//         console.error(
//           'Failed to fetch artist',
//           artistIDResponse.status,
//           artistIDResponse.statusText
//         );
//       }
//     } catch (error) {
//       setError('Error occurred while fetching data');
//       console.error('Error:', error);
//     }
//   };

//   const playMusic = async (previewUrl) => {
//     if (audio) {
//       await audio.unloadAsync();
//     }
//     const { sound } = await Audio.Sound.createAsync({ uri: previewUrl });
//     setAudio(sound);
//     await sound.playAsync();
//   };

//   const kidsList =
//   'https://api.spotify.com/v1/search?q=kids%20songs&type=track&limit=24';

// const fetchSongsList = async () => {
//   try {
//     const kidsSongsResponse = await fetch(kidsList, searchParameters);

//     if (kidsSongsResponse.ok) {
//       const kidsData = await kidsSongsResponse.json();
//       const kidsTracks = kidsData.tracks?.items || [];
//       setKidsSongs(kidsTracks);
//       console.log(kidsData);
//     } else {
//       console.error(
//         'Failed to fetch kids songs',
//         kidsSongsResponse.status,
//         kidsSongsResponse.statusText
//       );
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };



//   // Perform a manual request to verify the endpoint and headers
// fetch(kidsList, searchParameters)
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Failed to fetch kids songs');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('Kids songs data:', data);
// })
// .catch(error => {
//   console.error('Error fetching kids songs:', error);
// });


//   return (
//         <View style={styles.container}>
//           <TouchableOpacity
//               style={styles.next}
//               onPress={() => navigation.navigate('Kids Zone')}
//             >
//               <Entypo name="video" size={24} color="black" />

//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.music}
//               onPress={() => navigation.navigate('Games Zone')}
//             >
//               <Entypo name="game-controller" size={24} color="black" />

//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.back}
//               onPress={() => navigation.navigate('Home')}
//             >
//               <AntDesign name="home" size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.movie}
//               onPress={() => navigation.navigate('Movies Zone')}>
//               <MaterialCommunityIcons name="movie-roll" size={24} color="black" />
//             </TouchableOpacity>
//             <View style={styles.searchBar}>
//             <SearchBar
                
//                 searchPhrase={searchInput}
//                 setSearchPhrase={setSearchInput}
//                 setClicked={setClicked}
//                 clicked={clicked}
//                 onKeyPress={(event) => {
//                   if (event.key == 'Enter') {
//                     search(searchInput); 
//                     console.log('Enter clicked');
//                   }
//                 }}
//                 onPress={(text) => {
//                   console.log('User Searched for: ', text);
//                  //setSearchInput(text); 
//                 }}
//             />
//             </View>

//           <LogInBtn
//             title="Search"
//             style={styles.search}
//             onPress={() => {
//               console.log('Search Btn Clicked');
//               setSearchInitiated(true);
//               search(searchInput);
//             }}
//           />
//           {loading && <ActivityIndicator size="large" />}
//           {error && <Text style={styles.errorText}>Error: {error}</Text>}
//           {searchInitiated && (
//             <FlatList
//                 style={styles.searchResult}
//                 data={tracks}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.trackItem}
//                     onPress={() => playMusic(item.preview_url)}
//                   >
//                     <Image source={{ uri: item.image }} style={styles.trackImage} />
//                     <View>
//                       <Text style={styles.trackName}>{item.name}</Text>
//                       <Text style={styles.trackArtists}>
//                         {item.artists.map((artist) => artist.name).join(', ')}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 )}
//            />
//          )}
//             <Text style={styles.header}>Your Music</Text>
//             <FlatList
//                 data={kidsSongs}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                   <View style={styles.songs}>
//                     <Image source={{ uri: item.album.images[0].url }} style={styles.trackImage} />
//                     <View>
//                       <Text style={styles.trackName}>{item.name}</Text>
//                       <Text style={styles.trackArtists}>
//                         {item.artists.map((artist) => artist.name).join(', ')}
//                       </Text>
//                     </View>
//                   </View>
//                 )}
//             />
//         </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     height:'100%',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     bottom:255,
//     color: 'white',
//     left: 125,
//   },
//   next: {
//     position: 'absolute',
//     top: 83,
//     right: 20,
//     zIndex: 12,
//   },
//   music:{
//     position: 'absolute',
//     top: 83,
//     right:60,
//   },
//   movie:{
//     left:283,
//     top:67,
//   },
//   back: {
//     position: 'absolute',
//     top: 83,
//     left: 20,
//     zIndex: 12,
//   },
//   songs:{
//     top: 41,
//     padding:2,
//     paddingBottom:2,
   
//   },
//   searchBar:{
//     top:82,
//     width:"94%",
//   },
//   search: {
//     width: 100,
//     height: '5%',
//     fontSize: 15,
//     backgroundColor: colors.lightGreen,
//     left: 303,
//     top:34,
//     paddingLeft: 10,
//   },
//   searchResult:{
//     marginTop:22,
//     height:'100%',
//     width:'90%'
//   },
//   trackItem: {
//     top:62,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//   },
//   trackImage: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
    
//   },
//   kidsSongsContainer: {
//     backgroundColor:colors.green,
//     height:"100%",
//     bottom:13,
//   },
//   trackName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color:colors.darkBlue,
//   },
//   trackArtists: {
//     fontSize: 16,
//     color: 'white',
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//   },
// });

// export default MusicScreen;


///////////////////////////////////////////////////////////


// 
/////////////////most resent ///////////////////////

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../assets/config/colors';
import SearchBar from '../assets/components/SearchBar';
import LogInBtn from '../assets/components/LogInBtn';

const CLIENT_ID = 'a829cad6b64344c88a2b7425a94e9f06';
const CLIENT_SECRET = '25ab471a807e411c82a140cfa83461ba';

const MusicScreen = () => {
  const navigation = useNavigation();

  const [searchInput, setSearchInput] = useState('');
  const [access_token, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [kidsSongs, setKidsSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);

  const searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  };

  const fetchAccessToken = async () => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
      const data = await response.json();
      setAccessToken(data.access_token);
      fetchSongsList();
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  useEffect(() => {
    fetchAccessToken();
    fetchSongsList();
  }, []);

  
  const search = async () => {
    setLoading(true);
    try {
      const artistIDResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        searchParameters,
       setSearchInitiated(true),
      );

      if (artistIDResponse.ok) {
        const artistData = await artistIDResponse.json();
        const artistID = artistData.artists?.items[0]?.id;

        if (artistID) {
          console.log('Artist ID is: ' + artistID);

          const albumsResponse = await fetch(
            `https://api.spotify.com/v1/artists/${artistID}/albums`,
            searchParameters
          );

          if (albumsResponse.ok) {
            const albumsData = await albumsResponse.json();
            const albums = albumsData.items;
            console.log('Artist Albums:', albums);

          
  
          //And fetching images

            const tracksWithImages = await Promise.all(
              albums.map(async (album) => {
                const imagesResponse = await fetch(album.images[0].url);
                const imageData = await imagesResponse.blob();
                return {
                  ...album,
                  image: URL.createObjectURL(imageData),
                };
              })
            );

            setTracks(tracksWithImages);
           setLoading(false); 
          } else {
            console.error('Failed to fetch artist albums');
           
          }
        } else {
          console.warn('No artist found for the search query.');
       
        }
      } else {
        console.error(
          'Failed to fetch artist',
          artistIDResponse.status,
          artistIDResponse.statusText
        );
      }
    } catch (error) {
      setError('Error occurred while fetching data');
      console.error('Error:', error);
    }
  };

  const playMusic = async (previewUrl, track) => {
    if (!previewUrl) {
      return;
    }
    if (audio) {
      await audio.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri: previewUrl }, {}, onPlaybackStatusUpdate);
    setAudio(sound);
    await sound.playAsync();
    setCurrentTrack(track);
    setIsPlaying(true);
  };


  const stopMusic = async () => {
    if (audio) {
      await audio.stopAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.isPlaying) {
      setPosition(status.positionMillis);
    }
    if (status.didJustFinish) {
      stopMusic();
    }
  };

  const kidsList =
    'https://api.spotify.com/v1/search?q=kids%20songs&type=track&limit=24';
  
const fetchSongsList = async () => {
  try {
    const kidsSongsResponse = await fetch(kidsList, searchParameters);

    if (kidsSongsResponse.ok) {
      const kidsData = await kidsSongsResponse.json();
      const kidsTracks = kidsData.tracks?.items || [];
      setKidsSongs(kidsTracks);
      console.log('Kids songs data:', kidsData);
    } else {
      console.error('Failed to fetch kids songs:', kidsSongsResponse.status, kidsSongsResponse.statusText);
      // Optionally, set an error message state for UI feedback
    }
  } catch (error) {
    console.error('Error fetching kids songs:', error);
    // Optionally, set an error message state for UI feedback
  }
};




  // Perform a manual request to verify the endpoint and headers
// fetch(kidsList, searchParameters)
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Failed to fetch kids songs');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('Kids songs data:', data);
// })
// .catch(error => {
//   console.error('Error fetching kids songs:', error);
// });


  return (
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.next}
              onPress={() => navigation.navigate('Kids Zone')}
            >
              <Entypo name="video" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.music}
              onPress={() => navigation.navigate('Games Zone')}
            >
              <Entypo name="game-controller" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.navigate('Home')}
            >
              <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.movie}
              onPress={() => navigation.navigate('Movies Zone')}>
              <MaterialCommunityIcons name="movie-roll" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.searchBar}>
            <SearchBar
                
                searchPhrase={searchInput}
                setSearchPhrase={setSearchInput}
                setClicked={setClicked}
                clicked={clicked}
                onKeyPress={(event) => {
                  if (event.key == 'Enter') {
                    search(searchInput); 
                    console.log('Enter clicked');
                  }
                }}
                onPress={(text) => {
                  console.log('User Searched for: ', text);
                 //setSearchInput(text); 
                }}
            />
            </View>

          <LogInBtn
            title="Search"
            style={styles.search}
            onPress={(item) => {
              console.log('Search Btn Clicked');
              setSearchInitiated(true);
              search(searchInput);
              isPlaying ? stopMusic() : playMusic(item.preview_url, item)
            
            }}
          />
          {loading && <ActivityIndicator size="large" />}
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {searchInitiated && (
            <FlatList
                style={styles.searchResult}
                data={tracks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.trackItem}
                    onPress={() => playMusic(item.preview_url, item)}
                  >
                    <Image source={{ uri: item.image }} style={styles.trackImage} />
                    <View>
                      <Text style={styles.trackName}>{item.name}</Text>
                      <Text style={styles.trackArtists}>
                        {item.artists.map((artist) => artist.name).join(', ')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
           />
         )}
            <Text style={styles.header}>Your Music</Text>
            <FlatList
                data={kidsSongs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[styles.songs, isPlaying && styles.activeSong]} // Apply different style when song is playing
                    onPress={() => isPlaying ? stopMusic() : playMusic(item.preview_url, item)} // Toggle play/pause
                  >
                    <Image source={{ uri: item.album.images[0].url }} style={styles.trackImage} />
                    <View>
                      <Text style={styles.trackName}>{item.name}</Text>
                      <Text style={styles.trackArtists}>
                        {item.artists.map((artist) => artist.name).join(', ')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
            />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height:'100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    bottom:255,
    color: 'white',
    left: 125,
  },
  next: {
    position: 'absolute',
    top: 83,
    right: 20,
    zIndex: 12,
  },
  music:{
    position: 'absolute',
    top: 83,
    right:60,
  },
  movie:{
    left:283,
    top:67,
  },
  back: {
    position: 'absolute',
    top: 83,
    left: 20,
    zIndex: 12,
  },
  songs:{
    top: 41,
    padding:2,
    paddingBottom:2,
   
  },
  searchBar:{
    top:82,
    width:"94%",
  },
  search: {
    width: 100,
    height: '5%',
    fontSize: 15,
    backgroundColor: colors.lightGreen,
    left: 303,
    top:34,
    paddingLeft: 10,
  },
  searchResult:{
    marginTop:22,
    height:'100%',
    width:'90%'
  },
  trackItem: {
    top:62,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  trackImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    
  },
  kidsSongsContainer: {
    backgroundColor:colors.green,
    height:"100%",
    bottom:13,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.darkBlue,
  },
  trackArtists: {
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default MusicScreen;