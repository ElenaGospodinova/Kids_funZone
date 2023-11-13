import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import KidsScreen from './screens/KidsScreen';
import ParentsScreen from './screens/ParentsScreen';
import BackgroundApp from './assets/components/BackgroundApp';

const Stack = createNativeStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
           name="Home"
           component={() => ( 
              <BackgroundApp>
                <WelcomeScreen />
              </BackgroundApp>
            )}
    />
       
        <Stack.Screen
          name="Parents Zone"
          component={() => (
            <BackgroundApp>
              <ParentsScreen />
            </BackgroundApp>
          )}
        />
         <Stack.Screen
          name="Kids Zone"
          component={() => (
            <BackgroundApp>
              <KidsScreen />
            </BackgroundApp>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
