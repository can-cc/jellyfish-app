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
import { selectTodoSortByID } from '../../redux/reducer/selector/todo-selector';
import { TodoList } from './TodoList';
import { useNavigation } from '@react-navigation/native';

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
