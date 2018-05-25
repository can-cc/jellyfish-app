// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createForm } from 'rc-form';

class TodoCreaterCompoent extends React.Component<{
  onSubmit: any
}> {
  state = { content: '', value: '' };

  submit = () => {
    this.setState({ content: this.state.value });
    this.props.onSubmit(this.state.value);
    setTimeout(() => {
      this.setState({ content: '' });
    });
  };

  render() {
    return (
      <List>
        <InputItem
          defaultValue={this.state.content}
          onChangeText={text => this.setState({ value: text })}
          clear
          returnKeyType="done"
          onSubmitEditing={this.submit}
          placeholder="Add Todo..."
          style={{ height: 60 }}
          labelNumber={2}
        >
          <Ionicons
            style={{ marginTop: -1, marginLeft: 5 }}
            color="#35caf3"
            name="ios-add"
            size={30}
          />
        </InputItem>
      </List>
    );
  }
}

export const TodoCreater = TodoCreaterCompoent;
