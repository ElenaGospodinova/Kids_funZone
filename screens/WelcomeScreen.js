import React from 'react';
import { SafeAreaView,
         StyleSheet, 
         Text,
         View
        } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Logo from '../assets/components/Logo';
import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';

export default function WelcomeScreen(props) {
  const navigation = useNavigation();
 
  const navigateItems = () => {
    navigation.navigate('Kids Zone'); 
    navigation.navigate('Games Zone');
    navigation.navigate('Music Zone');
    navigation.navigate('Home');

};

const greetingMessage = () => {
  const currentTime = new Date().getHours();
  if (currentTime < 12) {
    return "Good Morning";
  } else if (currentTime < 16) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
const message = greetingMessage();

  return (
    <SafeAreaView style={styles.background}>
      <Logo />
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        top:93,
        left:124,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
            color: "white",
        }}
      >
      {message}
      </Text>
      </View>
      <LogInBtn style={styles.childBtn}
          title="Videos"
          onPress={() => navigation.navigate('Kids Zone')}
        />
        <LogInBtn style={styles.childBtn}
          title="Games"
          onPress={() => navigation.navigate('Games Zone')}
        />
         <LogInBtn style={styles.childBtn}
          title="Music"
          onPress={() => navigation.navigate('Music Zone')}
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
    width:140,
    height:50,
    flexDirection:'column',
    borderRadius:12,
    padding:2,
    margin:9,
    backgroundColor:colors.lightGreen,
    color:'white',
    top:169,
    left:133,
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