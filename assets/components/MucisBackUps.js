import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class MucisBackUps extends Component {
  render() {
        // const renderKidsSongs = () => {
  //   return (
  //     <FlatList
  //       data={kidsSongs}
  //       keyExtractor={(item) => item.id.toString()}
  //       renderItem={({ item }) => (
  //         <TouchableOpacity
  //           style={styles.trackItem}
  //           onPress={() => playMusic(item.album.preview_url)}
  //         >
  //            <Image source={{ uri: item.image }} style={styles.trackImage} />
  //           <View>
  //             <Text style={styles.trackName}>{item.name}</Text>
  //             <Text style={styles.trackArtists}>
  //               {item.artists.map((artist) => artist.name).join(', ')}
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //       )}
  //     />
  //   );
  // };
  
  
  // useEffect(() => {
  //   fetchSongsList(); 
  // }, []);

  // const renderTracks = () => {
  //   return (
  //     <FlatList
  //       data={tracks}
  //       keyExtractor={(item) => item.id.toString()}
  //       renderItem={({ item }) => (
  //         <TouchableOpacity
  //           style={styles.trackItem}
  //           onPress={() => playMusic(item.preview_url)}
  //         >
  //           <Image source={{ uri: item.image }} style={styles.trackImage} />
  //           <View>
  //             <Text style={styles.trackName}>{item.name}</Text>
  //             <Text style={styles.trackArtists}>
  //               {item.artists.map((artist) => artist.name).join(', ')}
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //       )}
  //     />
  //   );
  // };

    return (
      <View>
        <Text>MucisBackUps</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})