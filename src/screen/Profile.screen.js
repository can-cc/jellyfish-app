import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../action/actions';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component {
  logout = () => {
    this.props.logout();
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>List</Text>
        <Button type="primary" onClick={this.logout}>
          Logout
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const ProfileScreenContainer = connect(
  state => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch),
      logout: () => {
        console.log('==========>');
        console.log(dispatch);
        dispatch({ type: 'RESET' });
      }
    };
  }
)(ProfileScreen);
