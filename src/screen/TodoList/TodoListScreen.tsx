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
import { selectAllTodo } from '../../redux/reducer/selector/todo-selector';
import { TodoList } from './TodoList';

export function TodoListScreen() {
  const dispatch = useDispatch();
  const getTodoList = () => {
    dispatch(getTodoListRequest());
  };
  useEffect(() => {
    getTodoList();
  }, []);

  const todoList = useSelector(selectAllTodo);

  return (
    <View style={styles.container}>
      <TodoCreator />

      <ScrollView
        style={{
          flex: 1
        }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={getTodoList} />}
      >
        <TodoList todoList={todoList} />
        {/* <View>
      {this.props.todos
        .filter((t: any) => !t.done)
        .map((t: any) => ({ ...t, key: t.id.toString() }))
        .map((item: any) => {
          const todo = item;
          return <TodoItem todo={todo} onTodoClick={this.onTodoClick} onCheckClick={this.onCheckClick} />;
        })}
    </View> */}
      </ScrollView>
    </View>
  );
}

// class TodoListScreen extends Component<any, any> {

//   // async grad() {

//   // }

//   componentDidMount() {
//     this.getTodoList();
//     //  this.grad(); TODO extract a component to do this
//   }

//   getTodoList = () => {
//     this.props.actions.GET_TODO_LIST_REQUEST({
//       userId: this.props.userId,
//       done: false
//     });
//   };

//   createTodo = (initalTodo: any) => {
//     this.props.actions.CREATE_TODO_REQUEST(initalTodo);
//   };

//   onTodoClick = (todo: any) => {
//     this.props.navigation.navigate('TodoDetail', {
//       todoId: todo.id
//     });
//   };

//   onCheckClick = (todo: any) => {
//     this.props.actions.UPDATE_TODO_REQUEST({ ...todo, done: !todo.done });
//   };

//   render() {
//     return (

//     );
//   }
// }

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
