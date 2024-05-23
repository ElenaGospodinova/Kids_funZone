import React from 'react';
import Constants  from 'expo-constants';

import colors from '../config/colors';
import { SafeAreaView, StyleSheet } from 'react-native';


 function Screen({children}) {
  return (
    <SafeAreaView style={styles.screen}>
        {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: Constants.statusBarHeight,
        flex:1,
        backgroundColor:colors.gradient,
        width:'100%',
        
    },
});

export default Screen;
