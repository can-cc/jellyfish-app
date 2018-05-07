// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { WingBlank, WhiteSpace, Button, List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { makeActionRequestCollection } from '../action/actions';
import epicAdapterService from '../service/single/epic-adapter.service';
import Actions from '../action/actions';

import 'rxjs/add/operator/take';

class SignInScreen extends Component<{
  actions: any,
  epicAdapterService: any,
  navigation: any
}> {
  static navigationOptions = {
    title: 'Login'
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
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <View>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <List>
            <InputItem
              labelNumber={5}
              {...getFieldProps('username', {
                rules: [{ required: true }]
              })}
            >
              Username
            </InputItem>
            <InputItem
              labelNumber={5}
              type="password"
              {...getFieldProps('password', {
                rules: [{ required: true }]
              })}
            >
              password
            </InputItem>
          </List>

          <WhiteSpace size="lg" />
          <Button type="warning" onClick={this.submit}>
            Sign In
          </Button>
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
