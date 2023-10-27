import React from 'react';
import { SafeAreaView,
         Text, 
         StyleSheet, 
         ImageBackground,
         Button,
         Alert, 
         View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Background from '../assets/components/Background';
import colors from '../assets/config/colors';

export default function WelcomeScreen(props) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.background}>
      <Background />
    <ImageBackground 
        source={require('../assets/img/backgroundImg.jpg')}
        style={styles.image}
        resizeMode='contain cover'
        />
      <View style={styles.childBtn}>
        <Button 
          title="LogIn as Child"
          onPress={() => Alert.alert('Cannot press this one')}
        />
      </View>
      <View style={styles.parentBtn}>
        <Button
          title="LogIn as Parent"
          onPress={() => Alert.alert('Cannot press this one')}
        />
      </View>
      <Text>Welcome Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:12,
  },
  childBtn:{
    width:150,
    height:40,
    borderRadius:12,
    backgroundColor:colors.orange,
    color:'white',
  },
  image:{
    flex:1,
    top:2,
    height:'100%',
    width:'100%',
    justifyContent:'flex-end',
    flexWrap: 'wrap',
    zIndex: -1,
    position: 'absolute',
  },
  parentBtn:{
      margin:12,
      width:150,
      height:40,
      borderRadius:12,
      backgroundColor:colors.green,
      color:'white',
    
  }
});
