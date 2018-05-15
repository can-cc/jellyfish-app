// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile';

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
          onSubmitEditing={this.submit}
          placeholder="Add Todo..."
        />
      </List>
    );
  }
}

export const TodoCreater = createForm()(TodoCreaterCompoent);
