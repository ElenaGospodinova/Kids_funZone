import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';


const NavigationBar = () => {

    const navigation = useNavigation();

  return (
  
    <View style={styles.fixedHeader}>
      <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Games Zone')}>
        <Entypo name="game-controller" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.music} onPress={() => navigation.navigate('Music Zone')}>
        <Entypo name="music" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('Home')}>
        <AntDesign name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate('Kids Zone')}
        >
          <Entypo name="video" size={24} color="white" />
        </TouchableOpacity>
    
    </View>
  );
}


const styles = StyleSheet.create({
    fixedHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      position:"static",
      marginTop:53,
    },
    next: {
      position: 'absolute',
      top: 3,
      right: 20,
      zIndex: 12,
    },
    home: {
      position: 'absolute',
      top: 3,
      left: 123,
      zIndex: 12,
    },
    goBack: {
      position: 'absolute',
      left: 12,
    },
    music: {
      position: 'absolute',
      top: 3,
      right: 60,
    },
    user: {
      left: 53,
      bottom: 8,
    },
  });
  
  export default NavigationBar;