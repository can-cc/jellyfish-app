import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { AppRootState } from '../reducer/reducer';
import { TodoStack } from './todo-stack';
import { SignInScreenContainer } from '../screen/LogIn.screen';

const Stack = createStackNavigator();

function Root() {
  const authToken = useSelector((state: AppRootState) => state.auth.token);
  return (
    <Stack.Navigator>
      {authToken ? (
        <>
          <Stack.Screen name="TodoStack" component={TodoStack} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={SignInScreenContainer}
          options={{
            headerShown: false
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{
            headerShown: false
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
