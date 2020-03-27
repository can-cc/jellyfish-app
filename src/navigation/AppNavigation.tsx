import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { AppRootState } from '../redux/reducer/reducer';
import { TodoStack } from './todo-stack';
import { SignInScreenContainer } from '../screen/LogIn.screen';
import { navigationRef } from './RootNavigation';
import { TodoListScreen } from '../screen/TodoList/TodoListScreen';
import { TodoDetailScreen } from '../screen/TodoDetail/TodoDetailScreen';
import i18n from 'i18n-js';

const Stack = createStackNavigator();

function Root() {
  const authToken = useSelector((state: AppRootState) => state.auth.token);
  return (
    <Stack.Navigator>
      {authToken ? (
        <>
          <Stack.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{
              title: i18n.t('defaultTodoListName'),
              headerStyle: {
                backgroundColor: '#FF8976',
                shadowColor: '#FF8976'
              }
            }}
          />
          <Stack.Screen
            name="TodoDetail"
            component={TodoDetailScreen}
            options={{
              title: '',
              headerStyle: {
                shadowColor: 'white'
              }
            }}
          />
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

export function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
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
