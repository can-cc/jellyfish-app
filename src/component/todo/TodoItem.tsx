import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CheckBox } from '../CheckBox';
import { Deadline } from '../Deadline.component';
import { AppText } from '../AppText';

export class TodoItem extends Component<any, any> {
  state = {};

  render() {
    const todo = this.props.todo;
    return (
      <TouchableHighlight
        underlayColor="rgba(100,149,237, 0.05)"
        style={{ width: '100%', flex: 1 }} onPress={() => this.props.onTodoClick(todo)}>
        <View
          style={{
            paddingLeft: 18,
            paddingRight: 10,
            paddingBottom: 8,
            paddingTop: 8,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <CheckBox
              style={{ marginTop: 2, flexShrink: 0 }}
              checked={todo.done}
              onChange={() => this.props.onCheckClick(todo)}
            />
            <AppText
              style={{
                color: 'black',
                flexShrink: 1,
                paddingLeft: 12,
                width: '100%',
                fontSize: 15,
                textDecorationLine: todo.done ? 'line-through' : 'none'
              }}
            >
              {todo.content}
            </AppText>

            {todo.deadline ? <Deadline style={{ flexShrink: 0 }} deadline={todo.deadline} /> : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
