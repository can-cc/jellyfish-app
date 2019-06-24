import React, { Component, SyntheticEvent } from 'react';
import { Linking, Text, View, Image, TouchableOpacity, Platform, TextInput } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import { WEBSITE } from '../env/env';
import { AsyncStorage } from 'react-native';
import Input from '../component/Input';
import { AppButton } from '../component/Button';
import { LoginAction } from '../action/login';
import { Dispatch } from 'redux';

class SignInScreen extends Component<
  {
    dispatch: any
  },
  {
    username: string;
    password: string;
  }
> {
  componentWillMount() {
    this._retrieveData();
  }

  _storeData = async (username: string) => {
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
        this.setState({
          username: value
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  submit = () => {
    this.props.dispatch(
      new LoginAction({
        username: this.state.username,
        password: this.state.password
      })
    );
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
    return (
      <View
        style={{
          backgroundColor: '#fafafa',
          flex: 1,
          paddingRight: 30,
          paddingLeft: 30
        }}
      >
        <View style={{ height: 40 }} />

        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Image style={{ width: 103, height: 25.5 }} source={require('../assets/hello.png')} />

          <TouchableOpacity onPress={this.handleSignUpClick}>
            <Text style={{ color: '#909090' }}>注册</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
        <Input
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
          onChangeText={(value: string) => {
            this.setState({ username: value });
          }}
        />

        <Input
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
          onChangeText={(value: string) => {
            this.setState({ password: value });
          }}
        />

        <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <AppButton
            title="ok"
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
          </AppButton>
        </View>
      </View>
    );
  }
}

export const SignInScreenContainer = connect(
  state => {
    return {};
  },
  dispatch => {
    return {};
  }
)(SignInScreen);
