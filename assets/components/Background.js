import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import colors from '../config/colors';

export default function Background() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Background</Text>
      <View style={styles.images}>
        <Animatable.Image
          animation="swing"
          iterationCount={12}
          direction="alternative"
          source={require('../img/k.png')}
          style={styles.image1}
        />
        <Animatable.Image
          animation="slideOutRight"
          easing="ease-out"
          iterationCount={1}
          direction="alternate"
          source={require('../img/i.png')}
          style={styles.image2}
        />
        <Animatable.Image
          animation="slideOutLeft"
          iterationCount={1}
          direction="alternate"
          source={require('../img/d.png')}
          style={styles.image3}
        />
        <Animatable.Image
          animation="lightSpeedIn"
          iterationCount={1}
          direction="alternative"
          source={require('../img/s.png')}
          style={styles.image4}
        />
        <View style={styles.img}> 
        <Animatable.Image
          animation="pulse"
          iterationCount={12}
          direction="alternative"
          source={require('../img/funZone.png')}
          style={styles.funZoneImg}
        />
        </View>
        <View style={styles.elephant}>
        <Animatable.Image
          animation="pulse"
          iterationCount={12}
          direction="alternative"
          source={require('../img/elephant.png')}
          style={styles.elephantImg}
        />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 62,
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    //backgroundColor: colors.orange,
  },
  img:{
    transform: [{rotate: '26deg'}],
    right:120,
    top:24,
  },
  funZoneImg: {
    width: 112,
    height: 28,
    bottom: 254,
    borderRadius: 12,
    right: 39,
   
  },
  elephant:{
    transform: [{rotate: '6deg'}],
    right:120,
    top:24,
  },
  elephantImg:{
    width:53,
    height:53,
    bottom:418,
    right:73,
    zIndex:2,
  },
  images: {
    width: '46%',
    height: 47,
    marginLeft: 162,
  },
  image1: {
    width: 66,
    height: 58,
    bottom: 107,
    right: 63,
    zIndex:1
  },
  image2: {
    width: 67,
    height: 65,
    bottom: 170,
    right: 113,
    zIndex: 12,
  },
  image3: {
    width: 65,
    height: 61,
    bottom: 193,
    left: 54,
    zIndex: 1,
  },
  image4: {
    width: 62,
    height: 61,
    bottom: 244,
    right: 1,
  },
  image: {
    width: 62,
    height: 58,
    justifyContent: 'space-around',
  },
});
