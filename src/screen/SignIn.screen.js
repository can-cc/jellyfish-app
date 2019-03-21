//
import React, { Component } from 'react';
import { StyleSheet, Linking, Text, View, Image, TouchableOpacity, PixelRatio, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { WingBlank, WhiteSpace, Button, List, Flex, InputItem, Toast } from 'antd-mobile-rn';
import { createForm } from 'rc-form';
import { makeActionRequestCollection } from '../action/actions';
import epicAdapterService from '../service/single/epic-adapter.service';
import Actions from '../action/actions';
import { WEBSITE } from '../env/env';
import { AsyncStorage } from 'react-native';

import 'rxjs/add/operator/take';

class SignInScreen extends Component {
  componentWillMount() {
    this._retrieveData();
  }

  _storeData = async username => {
    try {
      await AsyncStorage.setItem('SIGNIN_USERNAME', username);
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('SIGNIN_USERNAME');
      if (value !== null) {
        // We have data!!
        this.props.form.setFieldsValue({
          username: value
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      this._storeData(value.username);
      this.props.actions.SIGNIN_REQUEST(value);
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
      <View style={{ backgroundColor: '#fafafa', flex: 1 }}>
        <WhiteSpace style={{ height: 130 }} />

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

          <WhiteSpace style={{ height: 40 }} />
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
              autoCapitalize="none"
              placeholderTextColor="#565656"
              placeholder="用户名"
              style={{
                borderTopWidth: 0,
                borderBottomColor: 'rgb(218, 218, 218)',
                borderBottomWidth: 1,
                marginLeft: 0,
                height: 60
              }}
              {...getFieldProps('username', {
                rules: [{ required: true }]
              })}
            />

            <InputItem
              autoCapitalize="none"
              type="password"
              placeholder="密码"
              placeholderTextColor="#565656"
              style={{
                borderTopWidth: 0,
                borderBottomColor: 'rgb(218, 218, 218)',
                borderBottomWidth: 1,
                marginLeft: 0,
                height: 60
              }}
              {...getFieldProps('password', {
                rules: [{ required: true }]
              })}
            />
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
                paddingTop: Platform.OS === 'ios' ? 4.5 : 0,
                position: 'relative'
              }}
              onClick={this.submit}
            >
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 16 : 40,
                  height: Platform.OS === 'ios' ? 17.5 : 43.75
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
