import { TouchableOpacity , Text, StyleSheet} from 'react-native'
import React from 'react'

import colors from '../config/colors'

export default function StartBtn({title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.startBtn, style]} onPress={onPress}>
        <Text style={styles.titleStart}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

    startBtn:{
        width:150,
        height:50,
        alignContent:'center',
        justifyContent:'center',
        paddingLeft:27,
        borderRadius:12,
        backgroundColor:colors.blue,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
    },
    titleStart:{
        color:'white',
        fontWeight:'900',
        fontFamily:Platform.OS === "android" ? "Roboto" : "Avenir",
        fontSize:14,
    },
    })