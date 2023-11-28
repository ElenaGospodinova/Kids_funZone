import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from './screens/WelcomeScreen';
import KidsScreen from './screens/KidsScreen';
import GamesScreen from './screens/GamesScreen';
import BackgroundApp from './assets/components/BackgroundApp';
import colors from './assets/config/colors';
import Testing from './screens/Testing';

const Stack = createNativeStackNavigator();

const ScreenWithBackground = ({ children }) => (
  <BackgroundApp>{children}</BackgroundApp>
);

const screenOptions = {
  headerStyle: {
    backgroundColor:colors.backgroundBlue,
   
  },
  headerTitleStyle: {
    color:colors.white, 
  },
  headerTintColor:colors.backgroundBlue,
  headerTransparent: true,
};

const tabBarOptions = {
  style: {
    backgroundColor: colors.backgroundBlue,
  },
  labelStyle: {
    color: colors.white,
  },
  activeTintColor: colors.white,
};

export default function App(props) {
  
  return (
    
    <NavigationContainer>
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }} // Optional: To hide the header
      >
        {() => (
          <ScreenWithBackground>
            <WelcomeScreen />
          </ScreenWithBackground>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Kids Zone"
        options={{ headerShown: false }} // Optional: To hide the header
      >
        {() => (
          <ScreenWithBackground>
            <KidsScreen />
          </ScreenWithBackground>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Games Zone"
        options={{ headerShown: false }} // Optional: To hide the header
      >
        {() => (
          <ScreenWithBackground>
            <GamesScreen />
          </ScreenWithBackground>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Testing"
        options={{ headerShown: false }} // Optional: To hide the header
      >
        {() => (
          <ScreenWithBackground>
            <Testing />
          </ScreenWithBackground>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  
  );
}


