import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

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
  
      music: {
        position: 'absolute',
        left: 10,
        backgroundColor:colors.lightGreen,
        padding:6,
        borderRadius:12,
      },
      next:{
        position:'absolute',
        right:10,
        backgroundColor:colors.lightGreen,
        padding:6,
        borderRadius:12,
      }
})