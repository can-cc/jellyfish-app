// @flow
import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Button, Tag, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile-rn';
import { Permissions, Constants, Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import Actions, { makeActionRequestCollection } from '../action/actions';
import epicAdapterService from '../service/single/epic-adapter.service';
import { TodoCreater } from '../component/todo/TodoCreater.component';
import { Deadline } from '../component/Deadline.component';

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

  createTodo = (initalTodo: { content: string, title: string, deadline: Date | null }) => {
    this.props.actions.CREATE_TODO_REQUEST(initalTodo);
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
            待办清单
          </Text>
          <TodoCreater onSubmit={this.createTodo} />
        </Flex>
        <ScrollView
          style={{ height: '100%' }}
          refreshControl={
            <RefreshControl refreshing={this.props.refreshing} onRefresh={this.getTodoList} />
          }
        >
          {!this.props.todos.filter(t => !t.done).length && (
            <Image
              style={{
                width: 246,
                height: 218
              }}
              source={require('../assets/empty-list.png')}
            />
          )}
          <FlatList
            data={this.props.todos.filter(t => !t.done).map(t => ({ ...t, key: t.id.toString() }))}
            renderItem={({ item }) => {
              const todo = item;
              return (
                <TouchableOpacity onPress={() => this.onTodoClick(todo)}>
                  <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
                    <Flex
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Checkbox checked={todo.done} onChange={() => this.onCheckClick(todo)} />
                      <Text
                        style={{
                          color: 'black',
                          flexShrink: 1,
                          marginLeft: 15,
                          width: '100%'
                        }}
                      >
                        {todo.content}
                      </Text>

                      {todo.deadline ? (
                        <Deadline style={{ flexShrink: 0 }} deadline={todo.deadline} />
                      ) : null}
                    </Flex>
                  </View>
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
  container: {
    backgroundColor: '#fafafa'
  }
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
