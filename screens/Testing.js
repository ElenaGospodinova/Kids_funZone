import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';

export default function Testing() {


    const navigation = useNavigation();

    const navigate = () => {
    navigation.navigate('Home'); 
    navigation.navigate('Games Zone');
  };
 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fixedHeader}>
            <TouchableOpacity style={styles.next} title='Games Zone'
                onPress={() => navigation.navigate('Kids Zone')}>
            <Entypo name="game-controller" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.back} title="Home"
                onPress={() => navigation.navigate('Home')}>
            <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>
            </View>
        <View>
            <Text>Testing</Text>
        </View>
      </SafeAreaView>
    )
  }


const styles = StyleSheet.create({
    next: {
        position: 'absolute',
        top: 3,
        right: 20,
        zIndex: 12,
        
      },
      back: {
        position: 'absolute',
        top: 3,
        left: 20,
        zIndex: 12,
      },
      fixedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      }
})

//7b40ccf4a7e0409db82869c16777e458