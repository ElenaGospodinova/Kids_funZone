import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import * as Animatable from 'react-native-animatable';
import Logo from './Logo';

const HomeNavBtn = () => {
    const navigation = useNavigation();

    return (
        
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    title="home"
                    onPress={() => navigation.navigate('Home')}
                >
                    <AntDesign name="home" size={24} color="white" />
                </TouchableOpacity>
            </View>
        
    );
}

export default HomeNavBtn;

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 0,
        width: '110%',
        height: '10%', 
        backgroundColor: colors.cyanBlue, 
        justifyContent: 'center', 
        alignItems: 'center',
        
      },
      button: {
       borderRadius:12,
        bottom:7,
        right:15,
        padding: 10,
        margin: 18,
        backgroundColor: colors.lightGreen,
      },
     
});
