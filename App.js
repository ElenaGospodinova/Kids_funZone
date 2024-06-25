import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, Dimensions } from "react-native";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ScreenOrientation from 'expo-screen-orientation';

import WelcomeScreen from "./screens/WelcomeScreen";
import KidsScreen from "./screens/KidsScreen";
import PlayListScreen from "./screens/PlayListScreen";
import MashaAndBear from "./screens/MashaAndBear";
import MrBean from "./screens/MrBean";
import GrizzyAndLemmings from "./screens/GrizzyLemmings";
import DrBinocsShow from './screens/DrBinocsShow';
import OddbodsCartoons from "./screens/OddbodsCartoons";
import StrawberryShortCake from "./screens/StrawberryShortCake";
import GamesScreen from "./screens/GamesScreen";
import MusicScreen from "./screens/MusicScreen";
import BackgroundApp from "./assets/components/BackgroundApp";
import colors from "./assets/config/colors";
import Testing from "./screens/Testing";
import OpenScreen from "./screens/OpenScreen.js";
import RecoveryScreen from "./screens/RecoveryScreen";
import UserScreen from "./screens/UserScreen";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const ScreenWithBackground = ({ children }) => (
  <BackgroundApp>{children}</BackgroundApp>
);

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.backgroundBlue,
  },
  headerTitleStyle: {
    color: colors.white,
  },
  headerTintColor: colors.backgroundBlue,
  headerTransparent: true,
};

export default function App(props) {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    lockOrientation();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
              {/* <Stack.Screen
                name="Start"
                options={{ headerShown: false }}
              >
                {() => (
                  <ScreenWithBackground>
                    <OpenScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Recovery Screen"
                options={{ headerShown: false }}
              >
                {() => (
                  <ScreenWithBackground>
                    <RecoveryScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen> */}
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
              >
                {() => (
                  <ScreenWithBackground>
                    <WelcomeScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Kids Zone"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <KidsScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              {/* <Stack.Screen
                name="Your List"
                options={{ headerShown: false }}
              >
                {() => (
                  <ScreenWithBackground>
                    <UserScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen> */}
              <Stack.Screen
                name="PlayList Zone"
                options={{ headerShown: false }}
              >
                {() => (
                  <ScreenWithBackground>
                    <PlayListScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Masha and the Bear "
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <MashaAndBear />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Mr Bean"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <MrBean />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Grizzy and Lemmings"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <GrizzyAndLemmings />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Dr Binocs Show"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <DrBinocsShow />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Oddbods Cartoons"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <OddbodsCartoons />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Strawberry Shortcake"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <StrawberryShortCake />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Games Zone"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <GamesScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Music Zone"
                options={{ headerShown: true }}
              >
                {() => (
                  <ScreenWithBackground>
                    <MusicScreen />
                  </ScreenWithBackground>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Testing"
                options={{ headerShown: false }}
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
      </GestureHandlerRootView>
    </>
  );
}
