import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavigationGames = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
         <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate('Kids Zone')}
        >
          <Entypo name="video" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.music}
          onPress={() => navigation.navigate('Music Zone')}
        >
          <Entypo name="music" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('Home')}
        >
          <AntDesign name="home" size={24} color="white" />
        </TouchableOpacity>
    </View>
  )
}

export default NavigationGames

const styles = StyleSheet.create({
    container: {
    
        flex: 1,
        padding: 16,
        left:13,
        },
    next: {
        position: 'absolute',
        right: 20,
        zIndex: 12,
      },
      music: {
        position: 'absolute',
        right: 60,
      },
      back: {
        position: 'absolute',
        left: 20,
        zIndex: 12,
      },
      game:{
        position:'absolute',
        right:94,
      }
})