import React, { Component } from 'react';
import { RefreshControl, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import { TodoCreator } from '../component/todo/TodoCreator';
// import { ListEmpty } from '../component/ListEmpty';
import { TodoItem } from '../component/todo/TodoItem';
import { Button } from '../component/Button';

class TodoListScreen extends Component<any, any> {
  static navigationOptions = ({ navigation }): any => {
    return {
      title: 'To do list'
    };
  };

  state = {
    showDone: false
  };

  async grad() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('不允许通知');
      return;
    }

    try {
      await Notifications.getExpoPushTokenAsync();
      // TODO
    } catch (error) {}
  }

  componentDidMount() {
    this.getTodoList();
    //  this.grad(); TODO extract a component to do this
  }

  getTodoList = () => {
    this.props.actions.GET_TODO_LIST_REQUEST({
      userId: this.props.userId,
      done: false
    });
  };

  createTodo = (initalTodo: any) => {
    this.props.actions.CREATE_TODO_REQUEST(initalTodo);
  };

  onTodoClick = (todo: any) => {
    this.props.navigation.navigate('TodoDetail', {
      todoId: todo.id
    });
  };

  onCheckClick = (todo: any) => {
    this.props.actions.UPDATE_TODO_REQUEST({ ...todo, done: !todo.done });
  };

  render() {
    return (
      <View style={styles.container}>
        <TodoCreator onSubmit={this.createTodo} />

        <ScrollView
          style={{
            flex: 1
          }}
          refreshControl={<RefreshControl refreshing={this.props.refreshing} onRefresh={this.getTodoList} />}
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
      todos: state.todo.result.map((id: string) => state.todo.entities.todo[id]).filter((todo: any) => !todo.hidden),
      refreshing: state.todo.refreshing
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoListScreen);
