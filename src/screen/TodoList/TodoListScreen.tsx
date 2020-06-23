import React, { useEffect } from 'react';
import { RefreshControl, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import {  useDispatch, useSelector } from 'react-redux';
import { TodoCreator } from './TodoCreator';
import { getTodoListRequest } from '../../redux/action/todo';
import { AppRootState } from '../../redux/reducer/reducer';
import { selectTodoSortByID } from '../../redux/reducer/selector/todo-selector';
import { TodoList } from './TodoList';

export function TodoListScreen() {
  const dispatch = useDispatch();
  const getTodoList = () => {
    dispatch(getTodoListRequest());
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const todoList = useSelector(selectTodoSortByID);
  const refreshing = useSelector((state: AppRootState) => state.todo.refreshing);

  return (
    <View style={styles.container}>
      <TodoCreator />

      <ScrollView
        style={{
          backgroundColor: '#FF8976',
          flex: 1
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTodoList} />}
      >
        <TodoList
          todoList={todoList}
          style={{
            padding: 8,
            marginBottom: 90
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1
  }
});
