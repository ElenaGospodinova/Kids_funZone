import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../config/colors'



export default function Background() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Background</Text>
      <View style={styles.images}>
        <Image source={require('../img/k.png')}
                    style={styles.image}/>
        <Image source={require('../img/i.png')}
                    style={styles.image}/>
        <Image source={require('../img/d.png')}
                    style={styles.image}/>
        <Image source={require('../img/s.png')}
                    style={styles.image}/>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        top:62,
        width:'100%',
        height:'40%',
        justifyContent:'center',
        alignContent:'center',
        position:'absolute',
        backgroundColor:colors.orange,
    },
    images:{
        width: '60%',
        marginLeft:52,
    },
    image:{
        width:42,
        height:42,
        
    }
})