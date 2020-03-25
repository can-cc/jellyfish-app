import { createStackNavigator } from '@react-navigation/stack';
import { TodoListScreenContainer } from '../screen/TodoList/TodoListScreen';
import { TodoDetailScreenContainer } from '../screen/TodoDetail.screen';

const Stack = createStackNavigator();

// TODO remove
export function TodoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TodoList" component={TodoListScreenContainer} />
      <Stack.Screen name="TodoDetail" component={TodoDetailScreenContainer} />
    </Stack.Navigator>
  );
}
