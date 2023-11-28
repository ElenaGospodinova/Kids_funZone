import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

export default function BackgroundApp({children}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/backgroundB.jpeg')}
        style={styles.image}
        resizeMode='cover'  
      >

       {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    top: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    zIndex: -1,
    position: 'absolute',
  },
});
