// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile';

import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { makeActionRequestCollection } from '../action/actions';
import { TodoCreater } from '../component/todo/TodoCreater.component';

const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

class TodoListScreen extends React.Component<{
  userId: string,
  todos: any[]
}> {
  static navigationOptions = {
    title: 'Todo List'
  };

  componentWillMount() {
    this.props.actions.GET_TODO_LIST_REQUEST({
      userId: this.props.userId,
      done: false
    });
  }

  createTodo = (content: string) => {
    this.props.actions.CREATE_TODO_REQUEST({ content });
  };

  onTodoClick = () => {
    this.props.navigation.navigate('TodoDetail');
  };

  render() {
    return (
      <View style={styles.container}>
        <TodoCreater onSubmit={this.createTodo} />
        <List>
          {this.props.todos.map(todo => {
            return (
              <Item key={todo.id} onClick={this.onTodoClick}>
                <Flex>
                  <Flex.Item>
                    <Checkbox />
                  </Flex.Item>
                  <Flex.Item>
                    <View>{todo.content}</View>
                  </Flex.Item>
                </Flex>
              </Item>
            );
          })}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

export const TodoListScreenContainer = connect(
  state => {
    return {
      userId: state.auth.userId,
      todos: state.todo.todos
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoListScreen);
