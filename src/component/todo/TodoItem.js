// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Tag, InputItem, WhiteSpace, Flex } from 'antd-mobile-rn';

import { createForm } from 'rc-form';
import { CheckBox } from '../CheckBox';
import { Deadline } from '../Deadline.component';

export class TodoItem extends React.Component<{
  todo: any,
  onTodoClick: any,
  onCheckClick: any
}> {
  state = {};

  render() {
    const todo = this.props.todo;
    return (
      <TouchableOpacity onPress={() => this.props.onTodoClick(todo)}>
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
          <Flex
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <CheckBox checked={todo.done} onChange={() => this.props.onCheckClick(todo)} />
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

            {todo.deadline ? <Deadline style={{ flexShrink: 0 }} deadline={todo.deadline} /> : null}
          </Flex>
        </View>
      </TouchableOpacity>
    );
  }
}
