import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../redux/action/actions';
import { Agenda } from 'react-native-calendars';
import format from 'date-fns/format';
import { NavigationScreenOptions } from 'react-navigation';

class CalendarScreen extends Component<any, any> {
  static navigationOptions = ({ navigation }): NavigationScreenOptions => {
    return {
      title: 'Calendar'
    };
  };


  render() {
    return (
      <View style={styles.container}>
        <Agenda
          items={this.props.items}
          renderEmptyDate={() => {
            return <View />;
          }}
          renderEmptyData={() => {
            return <View />;
          }}
          renderItem={(item: any, firstItemInDay: any) => {
            let title;
            switch (item.type) {
              case 'CREATEDAT':
                title = `创建于 ${item.todo.createdAt}`;
                break;
              case 'DEADLINE':
                title = `于 ${item.todo.deadline} 到期`;
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
                  <Text>{item.todo.content}</Text>
              </TouchableOpacity>
            );
          }}
          current={new Date()}
          hideExtraDays={true}
          rowHasChanged={(r1: any, r2: any) => {
            return r1.todo !== r2.todo;
          }}
          futureScrollRange={1}
          onDayPress={(day: any) => {}}
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
  (state: any) => {
    const items: any = {};
    const todos = state.todo.result
      .map((id: any) => state.todo.entities.todo[id])
      .map((todo: any) => {
        if (todo.deadline) {
          const dateStr = format(todo.deadline, 'yyyy-MM-dd');
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
          const dateStr = todo.createdAt;
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
