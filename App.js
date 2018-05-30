import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Button } from 'antd-mobile';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from './src/store/store';

import { InitLoadingScreenContainer } from './src/screen/InitLoading.screen';
import { SignInScreenContainer } from './src/screen/SignIn.screen';
import { TodoListScreenContainer } from './src/screen/TodoList.screen';
import { TodoDetailScreenContainer } from './src/screen/TodoDetail.screen';
import { ProfileScreenContainer } from './src/screen/Profile.screen';
import { CalendarScreenContainer } from './src/screen/Calendar.screen';
import { AboutScreenContainer } from './src/screen/About.screen';
import { AccountScreenContainer } from './src/screen/Account.screen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { PersistorContext } from './src/component/context/PersistorContext';

const { store, persistor } = createStore();

const TodoStack = StackNavigator({
  TodoList: TodoListScreenContainer,
  TodoDetail: TodoDetailScreenContainer
});

const ProfileStack = StackNavigator({
  Profile: ProfileScreenContainer,
  About: AboutScreenContainer,
  Account: AccountScreenContainer
});

const MainTab = TabNavigator(
  {
    Todo: {
      screen: TodoStack
    },
    Profile: ProfileStack,
    Calendar: CalendarScreenContainer
  },
  {
    /* initialRouteName: 'Calendar', */
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#2d9afa',
      inactiveTintColor: '#555',
      allowFontScaling: false,
      style: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        height: 55,
        backgroundColor: '#eee'
      },
      labelStyle: {
        top: -8,
        fontSize: 12
      }
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Todo') {
          iconName = `ios-paper${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Calendar') {
          iconName = `ios-calendar${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={20} color={tintColor} />;
      }
    })
  }
);

const AppSwitchNavigator = SwitchNavigator(
  {
    InitLoading: InitLoadingScreenContainer,
    Main: MainTab,
    SignIn: SignInScreenContainer
  },
  {
    initialRouteName: 'InitLoading'
  }
);

import { Asset, AppLoading } from 'expo';

export default class Main extends Component {
  state = { isReady: false };

  guaranteePersist = () => {
    this._unsubscribe = persistor.subscribe(this.handlePersistorState);
  };

  handlePersistorState = () => {
    return new Promise((resolve, reject) => {
      return resolve();
      let { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        setTimeout(() => {
          this.setState({ isReady: true });
          this._unsubscribe && this._unsubscribe();
          resolve();
        }, 3000);
      }
    });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.guaranteePersist}
          onFinish={() => {
            this.setState({ isReady: true });
          }}
          onError={() => {}}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistorContext.Provider value={persistor}>
          <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <AppSwitchNavigator />
          </View>
        </PersistorContext.Provider>

        {/* <PersistGate loading={<AppLoading onError={console.warn} />} persistor={persistor}>
            </PersistGate> */}
      </Provider>
    );
  }
}
