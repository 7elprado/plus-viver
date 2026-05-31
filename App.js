import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CenarioDetailScreen from './src/screens/CenarioDetailScreen';
import DenunciaScreen from './src/screens/DenunciaScreen';
import ComunidadeScreen from './src/screens/ComunidadeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F5F7FA' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Cenario" component={CenarioDetailScreen} />
        <Stack.Screen name="Denuncia" component={DenunciaScreen} />
        <Stack.Screen name="Comunidade" component={ComunidadeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
