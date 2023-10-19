import React from 'react';
import { SafeAreaView, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../assets/config/colors';
import Background from '../assets/components/Background';


export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.background}>
    <Background />
      {/* <ImageBackground 
                source={require('../assets/img/logo.png')}
                style={styles.image}
                resizeMode='cover'
                ></ImageBackground> */}
      <Text>Welcome Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    flex:1,
    height:'80%',
    width:'100%',
    justifyContent:'flex-end',
    flexWrap: 'wrap',
    zIndex: 1,
    position: 'absolute',
    
},
});
