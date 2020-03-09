import React from 'react';
import { AppSwitchNavigator } from './app-switch';
import { NavigationContainer } from '@react-navigation/native';

// TODO remove this nest
export function AppContainer() {
  return (
    <NavigationContainer>
      <AppSwitchNavigator />
    </NavigationContainer>
  );
}
