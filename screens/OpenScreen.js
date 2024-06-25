import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../assets/utils/supabaseClient';
import Auth from '../assets/components/Auth';
import Account from '../assets/components/Account';
import { Session } from '@supabase/supabase-js';

import Logo from '../assets/components/Logo';
import colors from '../assets/config/colors';


const OpenScreen = () => {
  const navigation = useNavigation();
  // const [session, setSession] = useState(null);
  // const [userName, setUserName] = useState('');
  

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (session && session.user) {
  //     setUserName(session.user.user_metadata.full_name); 
  //   }
  // }, [session]);



  return (
  <View style={styles.container}>
  <Logo/>
    {/* <View>
      <Logo style={styles.logoS}/>
      <Text>{userName}</Text>
    </View>
    <View style={styles.logIn}>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
    <View style={styles.forgottenP}>
        <Text style={styles.text}onPress={() => navigation.navigate('Recovery Screen')}>
          Forgotten Password
        </Text>
    </View> */}
      
  </View>
)
}

export default OpenScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  forgottenP:{
    top:208,
    left:153,
    
  },
  text: {
    color:colors.darkBlue,
    textDecorationLine:'underline',
  },
  logoS:{
    top:283,
    width:373,
    
  },
  logIn:{
    top:333,
    left:134,
    width:233,
    color:colors.white,
  },
})