import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { supabase } from '../utils/supabaseClient';
import colors from '../config/colors';
import Logo from '../components/Logo';

const RecoveryScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Password reset email sent successfully!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const passwordRecoveryCallback = async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        if (newPassword) {
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (error) {
            Alert.alert("Error", "There was an error updating your password.");
          } else {
            Alert.alert("Success", "Password updated successfully!");
          }
        }
      }
    };

    const authSubscription = supabase.auth.onAuthStateChange(passwordRecoveryCallback);
    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.logoR}>
      <Logo/>
    </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Email"
          labelStyle={{ color: 'white' }}
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: colors.darkBlue }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <Button
          buttonStyle={styles.button}
          title="Send Email"
          titleStyle={{ fontWeight: 'bold' }}
          disabled={loading}
          onPress={sendEmail}
        />
      </View>
      {/* <Text style={styles.recoveryText}>Recovery Screen</Text> */}
    </View>
  );
}

export default RecoveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    margin:121,
    
  },
  logoR:{
    top:414,
    right:134,
    width:303,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    width:'90%',
    top:263,
    right:12,
  },
  button: {
    marginTop: 60,
    backgroundColor: colors.lightGreen,
    borderRadius:12,
  },
  recoveryText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
