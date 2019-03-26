//
import React from 'react';
import { View, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile-rn';
import { AppText } from '../AppText';

export class CreateTodoToggle extends React.Component {
  state = {};

  render() {
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          style={{
            width: 115,
            height: 50,
            borderWidth: 0,
            borderRadius: 25,
            position: 'absolute',
            left: '50%',
            top: '0%',
            marginLeft: -55,
            marginTop: -25
          }}
          onPress={e => {
            e.preventDefault();
            this.props.onClick();
          }}
        >
          <View
            style={{
              flex: 1,
              shadowColor: 'rgba(64, 64, 64, 0.15)',
              shadowOpacity: 1,
              shadowRadius: 9,
              shadowOffset: { width: 0, height: 5 },
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingTop: 5
            }}
          >
            <Image
              style={{
                width: 10,
                height: 10
              }}
              source={require('../../assets/icons/+.png')}
            />
            <View style={{ width: 3, height: 10 }} />
            <AppText style={{ marginLeft: 5, fontSize: 15, fontWeight: '200' }}>新任务</AppText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
