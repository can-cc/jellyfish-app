import React, { Component } from 'react';
import { View, StatusBar, Image, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
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
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = createStore();

const TodoStack = createStackNavigator(
  {
    TodoList: TodoListScreenContainer,
    TodoDetail: TodoDetailScreenContainer
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#e8e8e8'
      }
    }
  }
);

TodoStack.defaultNavigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: '清单'
  };
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreenContainer,
  About: AboutScreenContainer,
  Account: AccountScreenContainer
});

ProfileStack.defaultNavigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: '账户'
  };
};

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
    defaultNavigationOptions: ({ navigation }) => ({
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

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class Main extends Component {
  state = { isReady: false };
  persistorUnsubscribe: any;

  guaranteePersist = () => {
    return new Promise((resolve, reject) => {
      this.persistorUnsubscribe = persistor.subscribe(() => {
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
          this.persistorUnsubscribe && this.persistorUnsubscribe();
          resolve();
        } else {
          reject();
        }
      });
    });
  };

  loadResourcesAsync = (): Promise<void> => {
    return Promise.all([
      this.guaranteePersist(),
      Asset.loadAsync([
        require('./src/assets/icons/list-active.png'),
        require('./src/assets/icons/list.png'),
        require('./src/assets/icons/jellyfish-active.png'),
        require('./src/assets/icons/jellyfish.png'),
        require('./src/assets/icons/calendar-active.png'),
        require('./src/assets/icons/calendar.png'),
        require('./src/assets/empty-list.png'),
        require('./src/assets/icons/plus.png'),
        require('./src/assets/3bg.jpg'),
        require('./src/assets/arrow-right.png'),
        require('./src/assets/arrow-top.png'),
        require('./src/assets/hello.png'),
        require('./src/assets/check.png')
      ])
    ]).then();
  };

  handlePersistorState() {}

  componentWillUnmount() {
    this.persistorUnsubscribe && this.persistorUnsubscribe();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={() => {
            this.setState({ isReady: true });
          }}
          onError={(error) => {
            if (!error) {
              return
            }
            console.warn(error);
          }}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
