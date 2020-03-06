import { CalendarScreenContainer } from '../screen/Calendar.screen';
import { createStackNavigator } from 'react-navigation-stack';
import { defaultNavigationOptions } from './common';

export const CalendarStack = createStackNavigator(
  {
    Calendar: CalendarScreenContainer
  },
  {
    defaultNavigationOptions: defaultNavigationOptions
  }
);
