import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../action/actions';
import { connect } from 'react-redux';
import { PersistorContext } from '../component/context/PersistorContext';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  };

  logout = persistor => {
    persistor.purge();
    this.props.logout();
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <PersistorContext.Consumer>
        {persistor => (
          <View style={styles.container}>
            <Text>List</Text>
            <Button type="primary" onClick={() => this.logout(persistor)}>
              Logout
            </Button>
          </View>
        )}
      </PersistorContext.Consumer>
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
