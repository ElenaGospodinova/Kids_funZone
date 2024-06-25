import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';
import { on } from 'events';


export default function VideoCard({ title, image, style, resizeMode, onPress }) {

    const navigation = useNavigation();
   
  return (
    <TouchableOpacity  onPress={onPress}>
      <View style={[styles.card, style]}>
        <Image style={[styles.photo, { resizeMode }]} source={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    
    padding: 2,
    paddingTop: 5,
    borderRadius: 15,
    marginTop: 20,
    height: 240,
    overflow: 'hidden',
  },
  photo: {
    width: '95%',
    left: 12,
    height: 200,
    borderRadius: 12,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  detailsContainer: {
    padding: 2,
    justifyContent: 'center',
    left: 10,
    bottom: 40,
    width: '90%',
    
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    marginVertical: 6,
    top: 40,
    fontSize:18,
  },
  subTitle: {
    color: colors.background,
    top: 50,
  }
});
