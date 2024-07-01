import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
//import { supabase } from '../assets/utils/supabaseClient';

import Logo from '../assets/components/Logo';
import LogInBtn from '../assets/components/LogInBtn';
import colors from '../assets/config/colors';


export default function WelcomeScreen({ session }) {
  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.background}>
      <Logo/>
      <View style={styles.buttonContainer}>
       
        <LogInBtn style={styles.childBtn} title="Videos 🎬" onPress={() => navigation.navigate('Kids Zone')} />
        <LogInBtn style={styles.childBtn} title="Games 🎮" onPress={() => navigation.navigate('Games Zone')} />
        <LogInBtn style={styles.childBtn} title="Music 🎶" onPress={() => navigation.navigate('Music Zone')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  childBtn: {
    width: 155,
    height: 49,
    flexDirection: 'column',
    borderRadius: 12,
    padding: 2,
    margin: 9,
    backgroundColor: colors.lightGreen,
    color: 'white',
    top: 159,
    left: 133,
  
  },

 
  // avatar: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   marginBottom: 10,
  // },
  // userName: {
  //   fontSize: 18,
  //   color: colors.white,
  // },
  // userInfo: {
  //   alignItems: 'center',
  // },
  // greeting: {
  //   fontSize: 24,
  //   color: colors.white,
  //   marginBottom: 20,
  // },
});