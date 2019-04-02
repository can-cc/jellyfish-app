//
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { CheckBox } from '../CheckBox';
import { Deadline } from '../Deadline.component';
import { AppText } from '../AppText';

export class TodoItem extends React.Component {
  state = {};

  render() {
    const todo = this.props.todo;
    return (
      <TouchableOpacity onPress={() => this.props.onTodoClick(todo)}>
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 15 }}>
          <Flex
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
                paddingLeft: 8,
                width: '100%',
                fontSize: 15,
                textDecorationLine: todo.done ? 'line-through' : 'none'
              }}
            >
              {todo.content}
            </AppText>

            {todo.deadline ? <Deadline style={{ flexShrink: 0 }} deadline={todo.deadline} /> : null}
          </Flex>
        </View>
      </TouchableOpacity>
    );
  }
}
