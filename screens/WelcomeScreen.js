import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../assets/utils/supabaseClient';


import Logo from '../assets/components/Logo';
import colors from '../assets/config/colors';
import LogInBtn from '../assets/components/LogInBtn';
import Avatar from '../assets/components/Avatar';

export default function WelcomeScreen({ session }) {
  const navigation = useNavigation();
  const [userAvatar, setUserAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (session && session.user) {
      fetchUserData(session.user.id);
    }
  }, [session]);

  const fetchUserData = async (userId) => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', userId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserName(data.username || '');
        setUserAvatar(data.avatar_url || '');
        setUserId(userId);
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    } finally {
      setLoading(false);
    }
  };

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

    return `${greeting}, ${userName || ''}, ${userId || ''}, ${userAvatar || ''}`;
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
    height: 49,
    flexDirection: 'column',
    borderRadius: 12,
    padding: 2,
    margin: 9,
    backgroundColor: colors.lightGreen,
    color: 'white',
    top: 159,
    left: 133,
  },
  avatarStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: colors.white,
  },
});
