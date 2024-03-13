import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../assets/utils/supabaseClient';

import Logo from '../assets/components/Logo';
import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';
import Avatar from '../assets/components/Avatar';

export default function WelcomeScreen({ session }) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  //const [userAvatar, setUserAvatar] = useState('');

  // useEffect(() => {
  //   if (session?.user) {
  //     getProfile();
  //   }
  // }, [session]);

  // async function getProfile() {
  //   try {
  //     const { data, error } = await supabase
  //       .from('profiles')
  //       .select('avatar_url, username')
  //       .eq('id', session.user.id)
  //       .single();

  //     if (error) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUserAvatar(data.avatar_url);
  //       setUserName(data.username);
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // }

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    let greeting = '';
    if (currentTime < 12) {
      greeting = 'Good Morning';
    } else if (currentTime < 16) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }

    //const userNameDisplay = userName ? `, ${userName}` : '';
    return `${greeting}${Avatar}`;
  };

  const message = greetingMessage();

  return (
    <SafeAreaView style={styles.background}>
    <Logo />
    <View style={{ justifyContent: 'center', alignItems: 'center', top: 93, left: 124 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', right: 33 }}>
        {message}
      </Text>
      {/* {userAvatar && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            url={userAvatar} // Pass user avatar URL to the Avatar component
            style={styles.avatarStyle}
          />
          <Text style={{ fontSize: 16, color: 'white', marginLeft: 10 }}>{userName}</Text>
        </View>
      )} */}
    </View>

    <LogInBtn style={styles.childBtn} title="Videos" onPress={() => navigation.navigate('Kids Zone')} />
    <LogInBtn style={styles.childBtn} title="Games" onPress={() => navigation.navigate('Games Zone')} />
    <LogInBtn style={styles.childBtn} title="Music" onPress={() => navigation.navigate('Music Zone')} />
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
    width: 140,
    height: 50,
    flexDirection: 'column',
    borderRadius: 12,
    padding: 2,
    margin: 9,
    backgroundColor: colors.lightGreen,
    color: 'white',
    top: 169,
    left: 93,
  },
  avatarStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
