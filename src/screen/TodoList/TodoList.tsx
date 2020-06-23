import React from 'react';
import { ITodo } from '../../typing/todo';
import { View } from 'react-native';
import { TodoItem } from './TodoItem';

export function TodoList({ todoList, style }: { todoList: ITodo[]; style?: any }) {
  return (
    <View
      style={{
        ...style
      }}
    >
      {todoList.map((todo: ITodo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </View>
  );
}
