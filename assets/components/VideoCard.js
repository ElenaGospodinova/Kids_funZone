import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

import colors from '../config/colors';

export default function VideoCard({title, subTitle, image}) {
  return (
    <View style={styles.card}>
        <Image  style={styles.photo} source={image} />
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={{color:'green'}}>{subTitle}</Text>
        </View>
    </View> 
  )
}

const styles = StyleSheet.create({
    card:{
        padding:20,
        paddingTop:50,
        borderRadius:15,
        backgroundColor:colors.color,
        marginBottom: 66,
        height:340,
        overflow:'hidden'
        
    },
    photo:{
        width: '100%',
        height: 200,
        borderRadius:12,
        
    },
    detailsContainer:{
       padding:20,
       justifyContent:'center',
       left:10,
    },
    title:{
        color:colors.green,
        fontWeight:'bold',
        marginVertical:6,
    },

})