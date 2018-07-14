// @flow
import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Button, List, Tag, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile-rn';
import { Permissions, Constants, Notifications } from 'expo';

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

  state = {};

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

    await Notifications.getExpoPushTokenAsync();
  }

  componentWillMount() {
    this.getTodoList();
    this.grad();
  }

  getTodoList = () => {
    /* this.setState({ refreshing: true }); */
    this.props.actions.GET_TODO_LIST_REQUEST({
      userId: this.props.userId,
      done: false
    });
  };

  createTodo = (content: string) => {
    this.props.actions.CREATE_TODO_REQUEST({ content, deadline: new Date().getTime() });
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
        <Flex
          style={{
            marginTop: 5,
            marginBottom: 8,
            height: 70,
            position: 'relative',
            width: '100%'
          }}
        >
          <Text
            style={{
              color: '#4295ff',
              letterSpacing: 1,
              fontSize: 16,
              position: 'absolute',
              fontWeight: '500',
              left: 13
            }}
          >
            代办清单
          </Text>
          <TodoCreater onSubmit={this.createTodo} />
        </Flex>
        <ScrollView
          style={{ height: '100%' }}
          refreshControl={
            <RefreshControl refreshing={this.props.refreshing} onRefresh={this.getTodoList} />
          }
        >
          <FlatList
            data={this.props.todos}
            renderItem={todo => {
              return (
                <TouchableOpacity onPress={() => this.onTodoClick(todo)}>
                  <Flex>
                    <Checkbox checked={todo.done} onChange={() => this.onCheckClick(todo)} />
                    <Text style={{ color: 'black', marginLeft: 15 }}>{todo.content}</Text>
                    {todo.deadline ? <Tag>{todo.deadline}</Tag> : null}
                  </Flex>
                </TouchableOpacity>
              );
            }}
          />
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
      todos: state.todo.result.map(id => state.todo.entities.todo[id]).filter(todo => !todo.hidden),
      refreshing: state.todo.refreshing
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoListScreen);
