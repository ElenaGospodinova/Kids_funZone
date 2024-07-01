import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

const NavigationMusic = () => {
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
          style={styles.game}
          onPress={() => navigation.navigate('Games Zone')}
        >
          <Entypo name="game-controller" size={24} color="white" />
        </TouchableOpacity>
    </View>
  )
}

export default NavigationMusic

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center', // Centers the buttons horizontally
      alignItems: 'center',
      flex: 1,
      padding: 16,
      bottom:43,
    },
    next: {
      position:'absolute',
      left:10,
      backgroundColor:colors.lightGreen,
      padding:6,
      borderRadius:12,
      },
      game:{
        position:'absolute',
        right:10,
        backgroundColor:colors.lightGreen,
        padding:6,
        borderRadius:12,
      }
})