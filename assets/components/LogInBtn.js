import { TouchableOpacity , Text, StyleSheet, Platform} from 'react-native'
import React from 'react'
import colors from '../config/colors'

export default function LogInBtn({title, onPress, style}) {
  return (
    <TouchableOpacity style={[styles.buttonLogin, style]} onPress={onPress}  disabled={false}>
        <Text style={styles.titleLogin}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

buttonLogin:{
    width:150,
    height:50,
    alignContent:'center',
    justifyContent:'center',
    paddingLeft:27,
    borderRadius:12,
    backgroundColor:colors.lightGreen,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.25,
    shadowRadius: 5.84,
    
},
titleLogin:{
    color:'white',
    fontWeight:'900',
    fontFamily:Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize:26,
    
},
})

