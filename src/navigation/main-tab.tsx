import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ProfileStack } from './profile-stack';
import { Image } from 'react-native';
import { TodoStack } from './todo-stack';
import { CalendarStack } from './calendar-stack';
import React from 'react';

export const MainTab = createBottomTabNavigator(
  {
    Todo: {
      screen: TodoStack
    },
    Calendar: CalendarStack,
    Profile: ProfileStack
  },
  {
    initialRouteName: 'Todo',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Todo') {
          return focused ? (
            <Image style={{ width: 23, height: 23 }} source={require(`../assets/icons/list-active.png`)} />
          ) : (
            <Image style={{ width: 23, height: 23 }} source={require(`../assets/icons/list.png`)} />
          );
        } else if (routeName === 'Profile') {
          return focused ? (
            <Image style={{ width: 23, height: 23 }} source={require(`../assets/icons/jellyfish-active.png`)} />
          ) : (
            <Image style={{ width: 23, height: 23 }} source={require(`../assets/icons/jellyfish.png`)} />
          );
        } else if (routeName === 'Calendar') {
          return focused ? (
            <Image style={{ width: 23, height: 23 }} source={require(`../assets/icons/calendar-active.png`)} />
          ) : (
            <Image style={{ width: 23, height: 23 }} source={require(`../assets/icons/calendar.png`)} />
          );
        } else {
          return null;
        }
      }
    })
  }
);
