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
import { TodoDetailScreenContainer } from './src/screen/TodoDetail.screen';
import { ProfileScreenContainer } from './src/screen/Profile.screen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { PersistorContext } from './src/component/context/PersistorContext';

const { store, persistor } = createStore();

const TodoStack = StackNavigator({
  TodoList: TodoListScreenContainer,
  TodoDetail: TodoDetailScreenContainer
});

const MainTab = TabNavigator(
  {
    Todo: {
      screen: TodoStack
    },
    Profile: ProfileScreenContainer
  },
  {
    /* initialRouteName: 'Profile' */
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Todo') {
          iconName = `ios-paper${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Calendar') {
          iconName = `ios-calendar{focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    })
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
          <PersistorContext.Provider value={persistor}>
            <AppSwitchNavigator />
          </PersistorContext.Provider>
        </PersistGate>
      </Provider>
    );
  }
}
