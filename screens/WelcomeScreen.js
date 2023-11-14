import React from 'react';
import { SafeAreaView,
         StyleSheet, 
        } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Logo from '../assets/components/Logo';
import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';

export default function WelcomeScreen(props) {
  const navigation = useNavigation();
 
  const navigateItems = () => {
    navigation.navigate('Kids Zone'); 
    // navigation.navigate('Parents Zone');
};


  return (
    <SafeAreaView style={styles.background}>
      <Logo />
    
      <LogInBtn style={styles.childBtn}
          title="Start"
          onPress={() => navigation.navigate('Kids Zone')}
        />
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
    width:120,
    height:50,
    borderRadius:12,
    backgroundColor:colors.lightGreen,
    color:'white',
    top:169,
    left:136,
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
  // parentBtn:{
  //     margin:12,
  //     width:150,
  //     height:40,
  //     borderRadius:12,
  //     backgroundColor:colors.green,
  //     color:'white',

  // }
});