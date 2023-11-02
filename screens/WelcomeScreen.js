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
import LogInBtn from '../assets/components/LogInBtn';

export default function WelcomeScreen(props) {
  const navigation = useNavigation();
 
  const navigateItems = () => {
    navigation.navigate('Kids Zone'); 
    navigation.navigate('Parents Zone');
};


  return (
    <SafeAreaView style={styles.background}>
      <Background />
    <ImageBackground 
        source={require('../assets/img/backgroundImg.jpg')}
        style={styles.image}
        resizeMode='contain cover'
        />
      <LogInBtn style={styles.childBtn}
          title="LogIn as Child"
          onPress={() => navigation.navigate('Kids Zone')}
        />
      <LogInBtn style={styles.parentBtn}
          title="LogIn as Parent"
          onPress={() => navigation.navigate('Parents Zone')}
        />
     
      {/* <Text>Welcome Screen</Text> */}
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