import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../utils/supabaseClient'
import { Button, Input } from 'react-native-elements'
import colors from '../config/colors'

import { useNavigation } from '@react-navigation/native';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  async function signInWithEmail() {
    setLoading(true)
    console.log({ email, password })
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
      setLoading(false)
  } else {
    navigation.navigate('Home' as never); // Navigate to Welcome screen on successful sign-in
  }
}

  async function signUpWithEmailP() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          labelStyle={{ color: 'white' }}
          leftIcon={{ type: 'font-awesome', name: 'envelope',color: colors.darkBlue  }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          labelStyle={{ color: 'white' }}
          leftIcon={{ type: 'font-awesome', name: 'lock',color: colors.darkBlue  }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button 
         buttonStyle={styles.button}
         title="Sign in" 
         titleStyle={{ fontWeight: 'bold' }}
         disabled={loading} 
         onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button 
        buttonStyle={styles.button}
        title="Sign up" 
        titleStyle={{ fontWeight: 'bold' }}
        disabled={loading} 
        onPress={() => signUpWithEmailP()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    
  },
  mt20: {
    marginTop: 20,
    
  },
  button: {
    backgroundColor: colors.lightGreen,
    borderRadius:12,
    fontWeight: 'bold'
  },
})