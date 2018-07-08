// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex, Modal } from 'antd-mobile-rn';
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

  onClose = () => {
    this.setState({
      modal1: false
    });
  };

  render() {
    return (
      <View>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          closable={false}
          style={{ top: -180 }}
          title={null}
          footer={null}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <TextInput
            placeholder="您希望做什么？"
            style={{
              height: 40,
              borderColor: 'gray',
              borderBottomWidth: 1
            }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />

          <Button
            style={{
              height: 45,
              backgroundColor: '#c2ddff',
              borderWidth: 0,
              shadowColor: 'rgb(194, 221, 255)',
              shadowOpacity: 0.58,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 7 }
            }}
            onClick={e => {}}
          >
            <Text
              style={{
                color: '#4295ff'
              }}
            >
              OK
            </Text>
          </Button>
        </Modal>

        <Button
          onClick={e => {
            e.preventDefault();
            this.setState({
              modal1: true
            });
          }}
        >
          default
        </Button>
      </View>
    );
  }
}

export const TodoCreater = TodoCreaterCompoent;
