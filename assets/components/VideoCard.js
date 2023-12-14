import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'

import colors from '../config/colors';

export default function VideoCard({title, subTitle, image, onPress}) {

    const onPress = () => {
        //fetch the local data
        
    }
    
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.card}>
        <Image  style={styles.photo} source={image} />
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
    </View> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card:{
        padding:2,
        paddingTop:5,
        borderRadius:15,
        marginTop: 16,
        height:340,
        overflow:'hidden'
        
    },
    photo:{
        width: '95%',
        left:12,
        height: 200,
        borderRadius:12,
        
    },
    detailsContainer:{
       padding:2,
       justifyContent:'center',
       left:10,
       bottom:40,
       width:'90%',
    },
    title:{
        color:colors.white,
        fontWeight:'bold',
        marginVertical:6,
        top:48,
    },
    subTitle:{
        color:colors.background,
        top:50,
    },
})