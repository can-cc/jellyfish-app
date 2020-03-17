import React, { Component } from 'react';
import { RefreshControl, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import { TodoCreator } from '../component/todo/TodoCreator';
import { TodoItem } from '../component/todo/TodoItem';
import { Button } from '../component/Button';

export function TodoListScreen() {
  return (
    <View style={styles.container}>
      <TodoCreator />

      <ScrollView
        style={{
          flex: 1
        }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      >
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
