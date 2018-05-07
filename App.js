import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Button } from 'antd-mobile';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './src/store/store';

import { AuthLoadingScreenContainer } from './src/screen/AuthLoading.screen';
import { SignInScreenContainer } from './src/screen/SignIn.screen';
import { TodoListScreenContainer } from './src/screen/TodoList.screen';
import { ProfileScreenContainer } from './src/screen/Profile.screen';

const { store, persistor } = createStore();

const MainTab = TabNavigator(
  {
    Todo: TodoListScreenContainer,
    Profile: ProfileScreenContainer
  },
  {
    initialRouteName: 'Profile'
  }
);

const AppSwitchNavigator = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreenContainer,
    Main: MainTab,
    SignIn: SignInScreenContainer
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppSwitchNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
