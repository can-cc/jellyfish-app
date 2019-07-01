import { createStackNavigator } from 'react-navigation';
import { TodoListScreenContainer } from '../screen/TodoList.screen';
import { TodoDetailScreenContainer } from '../screen/TodoDetail.screen';
import { defaultNavigationOptions } from './common';

export const TodoStack = createStackNavigator({
  TodoList: TodoListScreenContainer,
  TodoDetail: TodoDetailScreenContainer
}, {
    defaultNavigationOptions: defaultNavigationOptions
});
