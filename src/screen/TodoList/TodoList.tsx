import React from 'react';
import { Todo } from '../../typing/todo';
import { View, Text } from 'react-native';
import { TodoItem } from './TodoItem';

export function TodoList({ todoList }) {
  return (
    <View
      style={{
        padding: 6
      }}
    >
      {todoList.map((todo: Todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </View>
  );
}
