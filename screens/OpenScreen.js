import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { supabase } from '../assets/utils/supabaseClient';
import Auth from '../assets/components/Auth';
import Account from '../assets/components/Account';
import { Session } from '@supabase/supabase-js';

import Logo from '../assets/components/Logo';
import colors from '../assets/config/colors';


const OpenScreen = () => {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
    <View >
      <Logo style={styles.logoS}/>
    </View>
    <View style={styles.logIn}>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  </View>
  )
}

export default OpenScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  logoS:{
    top:283,
    width:373,
  },
  logIn:{
    top:333,
    left:134,
    width:233,
    color:colors.darkBlue,
  },
})