import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../assets/utils/supabaseClient';

import Logo from '../assets/components/Logo';
import LogInBtn from '../assets/components/LogInBtn';
import Avatar from '../assets/components/Avatar';
import colors from '../assets/config/colors';

export default function WelcomeScreen({ session }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        setLoading(true);
        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', userId)
          .single();

        if (error || status === 406) {
          throw error || new Error('User data not found');
        }

        if (data) {
          setUserData(data);
        } else {
          throw new Error('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session && session.user) {
      fetchUserData(session.user.id);
    }
  }, [session]);

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

    if (userData && userData.username) {
      greeting += `, ${userData.username}`;
    }

    return greeting;
  };

  return (
    <SafeAreaView style={styles.background}>
      <Logo />
      <View style={styles.container}>
        <Text style={styles.greeting}>{greetingMessage()}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : session && session.user && userData && userData.avatar_url && userData.username ? (
          <View style={styles.userInfo}>
            <Avatar url={userData.avatar_url} style={styles.avatar} />
            <Text style={styles.userName}>{userData.username}</Text>
          </View>
        ) : (
          <Text style={styles.userName}>Loading user data...</Text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: colors.white,
  },
  userInfo: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: colors.white,
    marginBottom: 20,
  },
});
