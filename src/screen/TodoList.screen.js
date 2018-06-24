// @flow
import React from 'react';
import { RefreshControl, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile-rn';

import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import Actions, { makeActionRequestCollection } from '../action/actions';
import epicAdapterService from '../service/single/epic-adapter.service';
import { TodoCreater } from '../component/todo/TodoCreater.component';

const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

class TodoListScreen extends React.Component<{
  userId: string,
  todos: any[]
}> {
  static navigationOptions = {
    title: '清单',
    tabBarLabel: '清单',
    headerBackTitle: null
  };

  state = {
    refreshing: false
  };

  componentWillMount() {
    this.getTodoList();
  }

  getTodoList = () => {
    this.setState({ refreshing: true });
    this.props.actions.GET_TODO_LIST_REQUEST({
      userId: this.props.userId,
      done: false
    });
    epicAdapterService.input$
      .ofType(Actions.GET_TODO_LIST.SUCCESS)
      .take(1)
      .subscribe(() => {
        this.setState({ refreshing: false });
      });
    epicAdapterService.input$
      .ofType(Actions.GET_TODO_LIST.FAILURE)
      .take(1)
      .subscribe(() => {
        this.setState({ refreshing: false });
      });
  };

  createTodo = (content: string) => {
    this.props.actions.CREATE_TODO_REQUEST({ content });
    epicAdapterService.input$
      .ofType(Actions.CREATE_TODO.SUCCESS)
      .take(1)
      .subscribe(() => {
        this.getTodoList();
      });
  };

  onTodoClick = todo => {
    this.props.navigation.navigate('TodoDetail', {
      todoId: todo.id
    });
  };

  onCheckClick = todo => {
    this.props.actions.UPDATE_TODO_REQUEST({ ...todo, done: !todo.done });
  };

  render() {
    return (
      <View style={styles.container}>
        <TodoCreater onSubmit={this.createTodo} />
        <ScrollView
          style={{ height: '100%' }}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.getTodoList} />
          }
        >
          <List>
            {this.props.todos.map(todo => {
              return (
                <Item key={todo.id} onClick={() => this.onTodoClick(todo)}>
                  <Flex>
                    <Checkbox checked={todo.done} onChange={() => this.onCheckClick(todo)} />
                    <Text style={{ color: 'black', marginLeft: 15 }}>{todo.content}</Text>
                  </Flex>
                </Item>
              );
            })}
          </List>
          <WhiteSpace size="xl" style={{ height: 80 }} />
        </ScrollView>
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
      todos: state.todo.result.map(id => state.todo.entities.todo[id]).filter(todo => !todo.hidden)
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoListScreen);
