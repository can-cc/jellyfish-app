// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { makeActionRequestCollection } from '../action/actions';
import { bindActionCreators } from 'redux';

class AuthLoadingScreen extends Component<{
  token: string
}> {
  constructor(props) {
    super(props);
    this.bootstrap();
  }

  bootstrap = () => {
    this.props.navigation.navigate(this.props.token ? 'Main' : 'SignIn');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }
}

export const AuthLoadingScreenContainer = connect(state => {
  return { token: state.auth.token };
})(AuthLoadingScreen);
