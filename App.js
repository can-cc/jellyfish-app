import React, { Component } from 'react';
import { View, StatusBar, Image, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';

import createStore from './src/store/store';

import NavigationService from './src/service/single/navigation.service';

import { InitLoadingScreenContainer } from './src/screen/InitLoading.screen';
import { SignInScreenContainer } from './src/screen/SignIn.screen';
import { TodoListScreenContainer } from './src/screen/TodoList.screen';
import { TodoDetailScreenContainer } from './src/screen/TodoDetail.screen';
import { ProfileScreenContainer } from './src/screen/Profile.screen';
import { CalendarScreenContainer } from './src/screen/Calendar.screen';
import { AboutScreenContainer } from './src/screen/About.screen';
import { AccountScreenContainer } from './src/screen/Account.screen';

import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import { PersistorContext } from './src/component/context/PersistorContext';

const { store, persistor } = createStore();

const TodoStack = createStackNavigator(
  {
    TodoList: TodoListScreenContainer,
    TodoDetail: TodoDetailScreenContainer
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#e8e8e8'
      }
    }
  }
);

const ProfileStack = createStackNavigator({
  Profile: ProfileScreenContainer,
  About: AboutScreenContainer,
  Account: AccountScreenContainer
});

const MainTab = createBottomTabNavigator(
  {
    Todo: {
      screen: TodoStack
    },
    Calendar: CalendarScreenContainer,
    Profile: ProfileStack
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
        top: Platform.OS === 'ios' ? -3 : -5,
        fontSize: 11
      }
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Todo') {
          return focused ? (
            <Image style={{ width: 23, height: 23 }} source={require(`./src/assets/icons/list-active.png`)} />
          ) : (
            <Image style={{ width: 23, height: 23 }} source={require(`./src/assets/icons/list.png`)} />
          );
        } else if (routeName === 'Profile') {
          return focused ? (
            <Image style={{ width: 23, height: 23 }} source={require(`./src/assets/icons/jellyfish-active.png`)} />
          ) : (
            <Image style={{ width: 23, height: 23 }} source={require(`./src/assets/icons/jellyfish.png`)} />
          );
        } else if (routeName === 'Calendar') {
          return focused ? (
            <Image style={{ width: 23, height: 23 }} source={require(`./src/assets/icons/calendar-active.png`)} />
          ) : (
            <Image style={{ width: 23, height: 23 }} source={require(`./src/assets/icons/calendar.png`)} />
          );
        }
      }
    })
  }
);

const AppSwitchNavigator = createSwitchNavigator(
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
    return new Promise(resolve => {
      this._unsubscribe = persistor.subscribe(() => {
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
          this._unsubscribe && this._unsubscribe();
          resolve();
        } else {
          reject();
        }
      });
    });
  };

  handlePersistorState() {}

  componentWillUnmount() {
    this._unsubscribe && this._unsubscribe();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.guaranteePersist}
          onFinish={() => {
            this.setState({ isReady: true });
          }}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistorContext.Provider value={persistor}>
          <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <AppSwitchNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </PersistorContext.Provider>
      </Provider>
    );
  }
}
