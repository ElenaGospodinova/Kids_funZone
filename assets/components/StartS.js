import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import BackgroundApp from './BackgroundApp';
import LogInBtn from './LogInBtn';
import WelcomeScreen from '../../screens/WelcomeScreen';

export default function StartS() {
  const navigation = useNavigation();

  const handleLogIn = () => {
    navigation.navigate(<WelcomeScreen/>); // Navigate to WelcomeScreen
  };

  return (
    <View>
      <BackgroundApp>
        <Text>Landing Page</Text>
        <LogInBtn onPress={handleLogIn} /> 
      </BackgroundApp>
    </View>
  );
}

const styles = StyleSheet.create({


});
