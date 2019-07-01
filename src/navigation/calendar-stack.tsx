import { CalendarScreenContainer } from '../screen/Calendar.screen';
import { createStackNavigator } from 'react-navigation';

export const CalendarStack = createStackNavigator({
  Calendar: CalendarScreenContainer
});
