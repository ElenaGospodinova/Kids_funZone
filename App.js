import React from 'react';
import { Provider } from 'react-redux';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { Dimensions } from 'react-native';
//import { configureStore } from '@reduxjs/toolkit';
//import watchedVideosReducer from './store/reduser';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import { onlineManager } from '@tanstack/react-query';

import WelcomeScreen from './screens/WelcomeScreen';
import KidsScreen from './screens/KidsScreen';
import PlayListScreen from './screens/PlayListScreen';
import MoviesScreen from './screens/MoviesScreen';
import GamesScreen from './screens/GamesScreen';
import MusicScreen from './screens/MusicScreen';
import BackgroundApp from './assets/components/BackgroundApp';
import colors from './assets/config/colors';
import Testing from './screens/Testing';
import OpenScreen from './screens/OpenScreen.js';
import RecoveryScreen from './screens/RecoveryScreen';
import UserScreen from './screens/UserScreen';
//import Auth from './assets/components/Auth';

const queryClient = new QueryClient()
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
  
  console.log(useDeviceOrientation());
  
   // Get device window dimensions
   const { width, height } = Dimensions.get('window');
   console.log('Device window dimensions:', width, height);


  return (
    <>
   
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
              name="Start"
              options={{ headerShown: false }} // Optional: To hide the header
            >
              {() => (
                <ScreenWithBackground>
                <OpenScreen/>
                </ScreenWithBackground>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Recovery Screen"
              options={{ headerShown: false }} // Optional: To hide the header
            >
              {() => (
                <ScreenWithBackground>
                <RecoveryScreen/>
                </ScreenWithBackground>
              )}
            </Stack.Screen>
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
              name="Your List"
              options={{ headerShown: false }} // Optional: To hide the header
            >
              {() => (
                <ScreenWithBackground>
                  <UserScreen/>
                </ScreenWithBackground>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="PlayList Zone"
              options={{ headerShown: false }} // Optional: To hide the header
            >
              {() => (
                <ScreenWithBackground>
                  <PlayListScreen />
                </ScreenWithBackground>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Movies Zone"
              options={{ headerShown: false }} // Optional: To hide the header
            >
              {() => (
                <ScreenWithBackground>
                  <MoviesScreen />
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
                name="Music Zone"
                options={{ headerShown: false }} // Optional: To hide the header
              >
                {() => (
                  <ScreenWithBackground>
                    <MusicScreen />
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
      </QueryClientProvider>
      
       
  </>
  
  );
}
