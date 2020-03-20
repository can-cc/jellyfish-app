import React from 'react';
import { Todo } from '../../typing/todo';
import { View } from 'react-native';
import { TodoItem } from './TodoItem';

export function TodoList({ todoList, style }: { todoList: Todo[]; style?: any }) {
  return (
    <View
      style={{
        padding: 6,
        ...style
      }}
    >
      {todoList.map((todo: Todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </View>
  );
}
