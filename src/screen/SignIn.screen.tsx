import React, { Component } from 'react';
import { Linking, Text, View, Image, TouchableOpacity, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { WEBSITE } from '../env/env';
import { AsyncStorage } from 'react-native';
import Input from '../component/Input';
import { AppButton } from '../component/Button';
import { signin } from '../action/login';
import { bindActionCreators, Dispatch } from 'redux';
import { AppText } from '../component/AppText';

class SignInScreen extends Component<
  {
    actions: {
      signin: (username: string, password: string) => void;
    };
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
    } catch (error) {}
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
    this._storeData(this.state.username);
    this.props.actions.signin(this.state.username, this.state.password);
  };

  handleSignUpClick = () => {
    Linking.canOpenURL(WEBSITE).then(supported => {
      if (supported) {
        Linking.openURL(WEBSITE + '/signup');
      } else {
        console.log("Don't know how to open URI: " + WEBSITE + '/signup');
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
        <View style={{ height: 80 }} />

        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Image style={{ width: 103, height: 25.5 }} source={require('../assets/hello.png')} />

          <View style={{ height: 20 }} />

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

        <View style={{ height: 20 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <AppButton
            style={{
              paddingLeft: 28,
              paddingRight: 28,
              borderRadius: 20
            }}
            type="primary"
            size="small"
            onPress={this.submit}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 16 : 40,
                  height: Platform.OS === 'ios' ? 17.5 : 43.75
                }}
                source={require('../assets/arrow-right.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  fontSize: 18,
                  marginLeft: 8
                }}
              >
                Login
              </Text>
            </View>
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
  (dispatch: Dispatch) => {
    return {
      actions: bindActionCreators(
        {
          signin
        },
        dispatch
      )
    };
  }
)(SignInScreen);
