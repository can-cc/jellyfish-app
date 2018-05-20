// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createForm } from 'rc-form';

class TodoCreaterCompoent extends React.Component<{
  onSubmit: any
}> {
  submit = () => {
    this.props.form.validateFields((error, value: { todoContent: string }) => {
      this.props.onSubmit(value.todoContent);
      this.props.form.setFieldsValue({
        todoContent: ''
      });
    });
  };

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <List>
        <InputItem
          {...getFieldProps('todoContent', {
            rules: [{ required: true }]
          })}
          returnKeyType="done"
          onSubmitEditing={this.submit}
          placeholder="Add Todo..."
          clear={true}
          style={{ height: 60 }}
          labelNumber={2}
        >
          <Ionicons
            style={{ marginTop: -1, marginLeft: 5 }}
            color="#35caf3"
            name="ios-add"
            size={25}
          />
        </InputItem>
      </List>
    );
  }
}

export const TodoCreater = createForm()(TodoCreaterCompoent);
