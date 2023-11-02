import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import  KidsScreen  from './screens/KidsScreen';
import ParentsScreen from './screens/ParentsScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={WelcomeScreen} />
        <Stack.Screen name="Kids Zone" component={KidsScreen} />
        <Stack.Screen name="Parents Zone" component={ParentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
