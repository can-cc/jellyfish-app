// @flow
import React, { Component } from 'react';
import { StyleSheet, Linking, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { WingBlank, WhiteSpace, Button, List, Flex, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { makeActionRequestCollection } from '../action/actions';
import epicAdapterService from '../service/single/epic-adapter.service';
import Actions from '../action/actions';
import { WEBSITE } from '../env/env';

import 'rxjs/add/operator/take';

class SignInScreen extends Component<{
  actions: any,
  epicAdapterService: any,
  navigation: any
}> {
  static navigationOptions = {
    title: '登录'
  };

  submit = () => {
    this.props.form.validateFields((error, value: { uername: string, password: string }) => {
      this.props.actions.SIGNIN_REQUEST(value);
      this.props.epicAdapterService.input$
        .ofType(Actions.SIGNIN.SUCCESS)
        .take(1)
        .subscribe(() => {
          this.props.navigation.navigate('Main');
        });

      this.props.epicAdapterService.input$
        .ofType(Actions.SIGNIN.FAILURE)
        .take(1)
        .subscribe(() => {
          Toast.fail('\n登录失败，请重试');
        });
    });
  };

  handleSignUpClick = () => {
    Linking.canOpenURL(WEBSITE).then(supported => {
      if (supported) {
        Linking.openURL(WEBSITE + '/signup');
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <WhiteSpace style={{ height: 100 }} />

        <WhiteSpace style={{ height: 30 }} />

        <WingBlank>
          <Flex style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={{ fontSize: 33, color: '#398aff', fontWeight: '600' }}>Hello </Text>

            <TouchableOpacity onPress={this.handleSignUpClick}>
              <Text style={{ color: '#909090' }}>注册</Text>
            </TouchableOpacity>
          </Flex>

          <List style={{ borderTopWidth: 0, borderBottomWidth: 0 }} renderHeader={() => {}}>
            <InputItem
              labelNumber={5}
              autoCapitalize="none"
              placeholderTextColor="#565656"
              style={{
                borderTopWidth: 0,
                borderBottomColor: 'rgb(218, 218, 218)',
                borderBottomWidth: 1
              }}
              {...getFieldProps('username', {
                rules: [{ required: true }]
              })}
            >
              用户名
            </InputItem>

            <InputItem
              labelNumber={5}
              autoCapitalize="none"
              type="password"
              placeholderTextColor="#565656"
              style={{ borderBottomColor: 'rgb(218, 218, 218)', borderBottomWidth: 1 }}
              {...getFieldProps('password', {
                rules: [{ required: true }]
              })}
            >
              密码
            </InputItem>
          </List>

          <WhiteSpace style={{ height: 50 }} />

          <Flex style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              type="primary"
              inline
              size="small"
              style={{ width: 64, height: 45 }}
              onClick={this.submit}
            >
              ->
            </Button>
          </Flex>

          <WhiteSpace style={{ height: 40 }} />
        </WingBlank>
      </View>
    );
  }
}

export const SignInScreenContainer = connect(
  state => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch),
      epicAdapterService
    };
  }
)(createForm()(SignInScreen));
