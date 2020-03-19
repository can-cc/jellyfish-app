import React, { Component } from 'react';
import { Linking, Text, View, Image, TouchableOpacity, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { WEBSITE_URL } from '../env/env';
import { AsyncStorage } from 'react-native';
import { Input } from '../component/Input';
import { AppButton } from '../component/Button';
import { signin } from '../redux/action/login';
import { bindActionCreators, Dispatch } from 'redux';
import i18n from 'i18n-js';

class LogInScreen extends Component<
  {
    actions: any;
    navigation: any;
  },
  {
    username: string;
    password: string;
  }
> {
  state = {
    username: '',
    password: ''
  };

  componentDidMount() {
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
    Linking.canOpenURL(WEBSITE_URL).then(supported => {
      if (supported) {
        Linking.openURL(WEBSITE_URL + '/signup');
      } else {
        console.log("Don't know how to open URI: " + WEBSITE_URL + '/signup');
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
        <View style={{ height: 180 }} />

        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Image style={{ width: 103, height: 25.5 }} source={require('../assets/hello.png')} />

          <View style={{ height: 20 }} />
        </View>

        <View style={{ height: 40 }} />
        <Input
          autoCapitalize="none"
          placeholderTextColor="#565656"
          placeholder={i18n.t('usernameText')}
          style={{
            borderTopWidth: 0,
            borderBottomColor: 'rgb(218, 218, 218)',
            borderBottomWidth: 1,
            marginLeft: 0,
            height: 55,
            fontSize: 17
          }}
          defaultValue={this.state.username}
          onChangeText={(value: string) => {
            this.setState({ username: value });
          }}
        />

        <View style={{ height: 12 }} />

        <Input
          autoCapitalize="none"
          placeholder={i18n.t('passwordText')}
          placeholderTextColor="#565656"
          style={{
            borderTopWidth: 0,
            borderBottomColor: 'rgb(218, 218, 218)',
            borderBottomWidth: 1,
            marginLeft: 0,
            height: 55,
            fontSize: 17
          }}
          secureTextEntry
          onChangeText={(value: string) => {
            this.setState({ password: value });
          }}
        />

        <View style={{ height: 28 }} />

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
                  width: 16,
                  height: 17.5
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
                {i18n.t('loginText')}
              </Text>
            </View>
          </AppButton>
        </View>

        <TouchableOpacity style={{ marginTop: 52 }} onPress={this.handleSignUpClick}>
          <Text style={{ color: '#0366d6', textAlign: 'center', fontWeight: 'bold' }}>{i18n.t('goSignUpText')}</Text>
        </TouchableOpacity>
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
)(LogInScreen);
