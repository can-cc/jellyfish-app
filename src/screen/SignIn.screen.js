// @flow
import React, { Component } from 'react';
import { StyleSheet, Linking, Text, View, Image, TouchableOpacity, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { WingBlank, WhiteSpace, Button, List, Flex, InputItem, Toast } from 'antd-mobile-rn';
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

        <WingBlank
          style={{
            paddingLeft: 25,
            paddingRight: 25
          }}
        >
          <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Image style={{ width: 103, height: 25.5 }} source={require('../assets/hello.png')} />

            <TouchableOpacity onPress={this.handleSignUpClick}>
              <Text style={{ color: '#909090' }}>注册</Text>
            </TouchableOpacity>
          </Flex>

          <List
            style={{ borderTopWidth: 0, borderBottomWidth: 0 }}
            styles={{
              Body: {
                borderTopWidth: 0,
                borderBottomWidth: 0
              }
            }}
            renderHeader={() => {}}
          >
            <InputItem
              labelNumber={5}
              autoCapitalize="none"
              placeholderTextColor="#565656"
              style={{
                borderTopWidth: 0,
                borderBottomColor: 'rgb(218, 218, 218)',
                borderBottomWidth: 1,
                marginLeft: 0
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
              style={{
                borderTopWidth: 0,
                borderBottomColor: 'rgb(218, 218, 218)',
                borderBottomWidth: 1,
                marginLeft: 0
              }}
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
              style={{
                width: 64,
                height: 45,
                borderRadius: 22.5,
                borderWidth: 0,
                paddingTop: 4.5,
                position: 'relative'
              }}
              onClick={this.submit}
            >
              <Image
                style={{
                  width: 21.3,
                  height: 23.3
                }}
                source={require('../assets/arrow-right.png')}
              />
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
