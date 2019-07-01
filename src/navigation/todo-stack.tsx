import { createStackNavigator } from 'react-navigation';
import { TodoListScreenContainer } from '../screen/TodoList.screen';
import { TodoDetailScreenContainer } from '../screen/TodoDetail.screen';

export const TodoStack = createStackNavigator({
  TodoList: TodoListScreenContainer,
  TodoDetail: TodoDetailScreenContainer
});
