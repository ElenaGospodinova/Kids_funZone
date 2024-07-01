import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

const NavigationKids = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.music}
          onPress={() => navigation.navigate('Music Zone')}
        >
          <Entypo name="music" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.game}
          onPress={() => navigation.navigate('Games Zone')}
        >
          <Entypo name="game-controller" size={24} color="white" />
        </TouchableOpacity>
     
    </View>
  )
}

export default NavigationKids

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top:2,
        padding: 26,
        marginTop:10,
        marginVertical:23,
        height:'60%',
        // Background color matching the button container
        justifyContent: 'center', // Centers the buttons horizontally
        alignItems: 'center',
        zIndex:1000,
        },
      music: {
        position: 'absolute',
        left: 24,
        backgroundColor:colors.lightGreen,
        padding:6,
        borderRadius:12,
      },
      game:{
        position:'absolute',
        right:24,
        backgroundColor:colors.lightGreen,
        padding:6,
        borderRadius:12,
      }
})