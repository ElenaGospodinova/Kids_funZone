import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
//import colors from '../config/colors';

export default function Logo() {
  return (
    <SafeAreaView style={styles.container}>
      
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
        <View style={styles.penguin}>
        <Animatable.Image
          animation="zoomInUp"
          iterationCount={2}
          direction='alternate-reverse'
          source={require('../img/penguin.png')}
          style={styles.penguinImg}
        />
        </View>
        <View style={styles.sloth}>
        <Animatable.Image
          animation='tada'
          iterationCount={12}
          direction='alternate'
          source={require('../img/sloth.png')}
          style={styles.slothImg}
        />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom:280,
    width: '100%',
    height: '40%',
    // justifyContent: 'center',
    // alignContent: 'center',
    left:43,
    position: 'absolute',
    //backgroundColor: colors.orange,
  },
  img:{
    transform: [{rotate: '26deg'}],
    right:120,
    top:24,
  },
  funZoneImg: {
    width: 152,
    height: 32,
    bottom: 254,
    borderRadius: 12,
    right: 39,
   
  },
  elephant:{
    transform: [{rotate: '-21.5deg'}],
    left:136,
    bottom:74.7,
  },
  elephantImg:{
    width:45,
    height:45,
    bottom:418,
    right:73,
    zIndex:3,
  },
  images: {
    width: '46%',
    height: 57,
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
  penguin:{
    transform: [{rotate: '33deg'}],
    left:28,
    bottom:359,
    zIndex:-1,
  },
  penguinImg:{
    width:45,
    height:55,
  },
  sloth:{
    transform: [{rotate: '24deg'}],
    bottom:331,
    right:50,
  },
  slothImg:{
    width:78,
    height:46,
  }
});
