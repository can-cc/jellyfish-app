import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Checkbox, WhiteSpace, Flex } from 'antd-mobile-rn';
import { Permissions, Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions, { makeActionRequestCollection } from '../action/actions';
import { TodoCreater } from '../component/todo/TodoCreater';
import { Deadline } from '../component/Deadline.component';
import { ListEmpty } from '../component/ListEmpty';
import { TodoItem } from '../component/todo/TodoItem';
import { Button } from '../component/Button';
import { AppText } from '../component/AppText';

class TodoListScreen extends React.Component {
  static navigationOptions = {
    title: '清单',
    headerBackTitle: null
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
    } catch (error) {
      /* console.error(error); */
    }
  }

  componentWillMount() {
    this.getTodoList();
    this.getTodoCycleStatus();
    this.grad();
  }

  getTodoList = () => {
    /* this.setState({ refreshing: true }); */
    this.props.actions.GET_TODO_LIST_REQUEST({
      userId: this.props.userId,
      done: false
    });
  };

  getTodoCycleStatus = () => {
    this.props.actions.GET_TODO_CYCLE_STATUS_LIST_REQUEST({
      userId: this.props.userId,
      done: false
    });
  };

  createTodo = initalTodo => {
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
          <AppText
            style={{
              color: '#4295ff',
              letterSpacing: 1,
              fontSize: 16,
              position: 'absolute',
              fontWeight: '500',
              left: 13,
              paddingLeft: 5
            }}
          >
            待办清单
          </AppText>
        </Flex>
        <ScrollView
          style={{
            height: '100%',
            paddingRight: 10,
            paddingLeft: 10
          }}
          refreshControl={<RefreshControl refreshing={this.props.refreshing} onRefresh={this.getTodoList} />}
        >
          {!this.props.todos.filter(t => !t.done).length && <ListEmpty />}

          <FlatList
            data={this.props.todos.filter(t => !t.done).map(t => ({ ...t, key: t.id.toString() }))}
            renderItem={({ item }) => {
              const todo = item;
              return <TodoItem todo={todo} onTodoClick={this.onTodoClick} onCheckClick={this.onCheckClick} />;
            }}
          />

          <View style={{ justifyContent: 'flex-start' }}>
            <TodoCreater onSubmit={this.createTodo} />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15
            }}
          >
            <Button
              onPress={e => {
                this.setState({ showDone: !this.state.showDone });
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: '#4295ff', fontSize: 14, paddingRight: 10, paddingLeft: 10 }}>
                  {this.state.showDone ? '收起' : '显示已完成'}
                </Text>
                {this.state.showDone && (
                  <Image style={{ width: 13, height: 13 }} source={require('../assets/arrow-top.png')} />
                )}
              </View>
            </Button>
          </View>

          <WhiteSpace size="xl" style={{ height: 20 }} />

          {this.state.showDone && (
            <FlatList
              data={this.props.todos.filter(t => t.done).map(t => ({ ...t, key: t.id.toString() }))}
              renderItem={({ item }) => {
                const todo = item;
                return <TodoItem todo={todo} onTodoClick={this.onTodoClick} onCheckClick={this.onCheckClick} />;
              }}
            />
          )}
          <WhiteSpace size="xl" style={{ height: 100 }} />
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
