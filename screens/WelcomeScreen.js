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
  const [userAvatar, setUserAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState('');


  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUserName(data.username)
        setUserAvatar(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

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

    return `${greeting}, ${userName || ''}`; 
  };

  const message = greetingMessage();

  return (
    <SafeAreaView style={styles.background}>
    <Logo />
    <View style={{ justifyContent: 'center', alignItems: 'center', top: 93, left: 124 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', right: 33 }}>
        {message}
      </Text>
      {loading ? (
          <ActivityIndicator size="large" color={colors.lightGreen} />
        ) : (
          userAvatar && (
            <View style={styles.userInfo}>
              <Avatar url={userAvatar} style={styles.avatarStyle} />
              <Text style={styles.userName}>{userName}</Text>
            </View>
          )
        )}
      </View>

    <LogInBtn style={styles.childBtn} title="Videos" onPress={() => navigation.navigate('Kids Zone')} />
    <LogInBtn style={styles.childBtn} title="Games" onPress={() => navigation.navigate('Games Zone')} />
    <LogInBtn style={styles.childBtn} title="Music" onPress={() => navigation.navigate('Music Zone')} />
    <LogInBtn style={styles.childBtn} title="Movies" onPress={() => navigation.navigate('Movies Zone')} />
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
