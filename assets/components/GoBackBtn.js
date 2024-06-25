import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import colors from '../config/colors';


const GoBackBtn = () => {

    const navigation = useNavigation();

  return (
  
    <View style={styles.fixedHeader}>
      <TouchableOpacity style={styles.goBack} onPress={() => navigation.navigate('Kids Zone')}>
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    fixedHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 13,
      position:'fixed',
      backgroundColor:colors.cyanBlue,
      width:'13%',
      borderRadius:22,
      zIndex: 1000, 
      marginTop:'10%',
    },
    goBack: {
      position: 'absolute',
      left: 12,
    }
  });
  
  export default GoBackBtn;