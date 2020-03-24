import React, { Component, useEffect } from 'react';
import { RefreshControl, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { bindActionCreators } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeActionRequestCollection } from '../../redux/action/actions';
import { TodoCreator } from './TodoCreator';
import { TodoItem } from './TodoItem';
import { Button } from '../../component/Button';
import { getTodoListRequest } from '../../redux/action/todo';
import useState from 'react';
import { AppRootState } from '../../redux/reducer/reducer';
import { selectAllTodoSortByID } from '../../redux/reducer/selector/todo-selector';
import { TodoList } from './TodoList';

export function TodoListScreen() {
  const dispatch = useDispatch();
  const getTodoList = () => {
    dispatch(getTodoListRequest());
  };
  useEffect(() => {
    getTodoList();
  }, []);

  const todoList = useSelector(selectAllTodoSortByID);
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

export const TodoListScreenContainer = connect(
  (state: any) => {
    return {
      userId: state.auth.userId,
      todos: [],
      refreshing: state.todo.refreshing
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoListScreen);
