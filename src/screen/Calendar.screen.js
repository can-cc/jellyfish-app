import React from 'react';
import { StyleSheet, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import format from 'date-fns/format';

class CalendarScreen extends React.Component {
  static defaultNavigationOptions = {
    title: '日程',
    tabBarLabel: '日程'
  };

  render() {
    return (
      <View style={styles.container}>
        <WhiteSpace style={{ height: 30 }} />
        <StatusBar barStyle="dark-content" />
        <Agenda
          items={this.props.items}
          renderEmptyDate={() => {
            return <View />;
          }}
          renderEmptyData={() => {
            return <View />;
          }}
          renderItem={(item, firstItemInDay) => {
            let title;
            switch (item.type) {
              case 'CREATEDAT':
                title = `创建于 ${format(item.todo.createdAt, 'MM/dd hh:mm')}`;
                break;
              case 'DEADLINE':
                title = `于 ${format(item.todo.deadline, 'MM/dd hh:mm')} 到期`;
                break;
              default:
                title = '';
                break;
            }
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('TodoDetail', {
                    todoId: item.todo.id
                  })
                }
              >
                <Card style={{ marginTop: 10, marginRight: 12 }}>
                  <Card.Header title={title} />
                  <Card.Body>
                    <WingBlank>
                      <Text>{item.todo.content}</Text>
                    </WingBlank>
                  </Card.Body>
                </Card>
              </TouchableOpacity>
            );
          }}
          current={new Date()}
          hideExtraDays={true}
          rowHasChanged={(r1, r2) => {
            return r1.todo !== r2.todo;
          }}
          futureScrollRange={1}
          onDayPress={day => {}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export const CalendarScreenContainer = connect(
  state => {
    const items = {};
    const todos = state.todo.result
      .map(id => state.todo.entities.todo[id])
      .map(todo => {
        if (todo.deadline) {
          console.log(todo.deadline);
          const dateStr = format(todo.deadline, 'yyyy-MM-dd');
          console.log(dateStr);
          const item = {
            todo: todo,
            dateStr,
            type: 'DEADLINE'
          };
          if (items[dateStr]) {
            items[dateStr] = items[dateStr].concat(item);
          } else {
            items[dateStr] = [item];
          }
        }

        if (todo.createdAt) {
          const dateStr = format(todo.createdAt, 'yyyy-MM-dd');
          const item = {
            todo: todo,
            dateStr,
            type: 'CREATEDAT'
          };
          if (items[dateStr]) {
            items[dateStr] = items[dateStr].concat(item);
          } else {
            items[dateStr] = [item];
          }
        }
      });
    return {
      items
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(CalendarScreen);
