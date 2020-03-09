import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import { TodoCreater } from '../component/todo/TodoCreater';
import { ListEmpty } from '../component/ListEmpty';
import { TodoItem } from '../component/todo/TodoItem';
import { Button } from '../component/Button';

class TodoListScreen extends Component<any, any> {
  static navigationOptions = ({ navigation }): NavigationScreenOptions => {
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

  componentWillMount() {
    this.getTodoList();
    this.grad();
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
        <TodoCreater onSubmit={this.createTodo} />

        <ScrollView
          style={{
            flex: 1
          }}
          refreshControl={<RefreshControl refreshing={this.props.refreshing} onRefresh={this.getTodoList} />}
        >
          {!this.props.todos.filter((t: any) => !t.done).length && <ListEmpty />}

          <FlatList
            style={{ marginTop: 18, flex: 1, width: '100%' }}
            data={this.props.todos.filter((t: any) => !t.done).map((t: any) => ({ ...t, key: t.id.toString() }))}
            renderItem={({ item }) => {
              const todo = item;
              return <TodoItem todo={todo} onTodoClick={this.onTodoClick} onCheckClick={this.onCheckClick} />;
            }}
          />

          <View
            style={{
              flex: 1,
              marginTop: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 18
            }}
          >
            <Button
              style={{ width: 150 }}
              onPress={(e: any) => {
                this.setState({ showDone: !this.state.showDone });
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row'
                }}
              >
                <Text style={{ color: '#fff', fontSize: 14, paddingRight: 10, paddingLeft: 10 }}>
                  {this.state.showDone ? '收起' : '显示已完成'}
                </Text>
                
              </View>
            </Button>
          </View>

          {this.state.showDone && (
            <FlatList
              data={this.props.todos.filter((t: any) => t.done).map((t: any) => ({ ...t, key: t.id.toString() }))}
              renderItem={({ item }) => {
                const todo = item;
                return <TodoItem todo={todo} onTodoClick={this.onTodoClick} onCheckClick={this.onCheckClick} />;
              }}
            />
          )}
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
