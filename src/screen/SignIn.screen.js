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
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 100, height: 100 }} source={require('../assets/imgs/logo.png')} />
        </View>
        <WhiteSpace style={{ height: 30 }} />

        <WingBlank>
          <List>
            <InputItem
              labelNumber={5}
              {...getFieldProps('username', {
                rules: [{ required: true }]
              })}
            >
              用户名
            </InputItem>
            <InputItem
              labelNumber={5}
              type="password"
              {...getFieldProps('password', {
                rules: [{ required: true }]
              })}
            >
              密码
            </InputItem>
          </List>

          <WhiteSpace style={{ height: 50 }} />

          <Button type="warning" onClick={this.submit}>
            登录
          </Button>

          <WhiteSpace style={{ height: 40 }} />

          <Flex style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.handleSignUpClick}>
              <Text>注册</Text>
            </TouchableOpacity>
          </Flex>
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
